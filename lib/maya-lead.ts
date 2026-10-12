export type MayaLead = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  projectType?: string;
  goals?: string;
  budget?: string;
  timeline?: string;
  handoffRequested?: boolean;
};

// In-memory set of recent submissions with timestamp to prevent duplicate submissions
const recentSubmissions = new Map<string, number>();
const SUBMISSION_DEDUP_MS = 15 * 60 * 1000; // 15 minutes

function cleanString(val: unknown, maxLen = 250): string {
  if (typeof val !== "string") return "";
  return val.trim().replace(/[\r\n\t]+/g, " ").slice(0, maxLen);
}

export function sanitizeLead(raw: unknown): MayaLead | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;

  const email = cleanString(obj.email, 240);
  const phone = cleanString(obj.phone, 50);
  const name = cleanString(obj.name, 120);
  const company = cleanString(obj.company, 160);
  const projectType = cleanString(obj.projectType, 120);
  const goals = cleanString(obj.goals || obj.details, 1500);
  const budget = cleanString(obj.budget, 120);
  const timeline = cleanString(obj.timeline, 120);
  const handoffRequested = obj.handoffRequested === true;

  // Basic validation: must have valid email or valid phone
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = /^[\d+\s()\-]{7,25}$/.test(phone);

  if (!isValidEmail && !isValidPhone) {
    return null;
  }

  return {
    name: name || undefined,
    email: isValidEmail ? email : undefined,
    phone: isValidPhone ? phone : undefined,
    company: company || undefined,
    projectType: projectType || undefined,
    goals: goals || undefined,
    budget: budget || undefined,
    timeline: timeline || undefined,
    handoffRequested,
  };
}

export function shouldSubmitLead(
  lead: MayaLead,
  userMessage: string,
  history: Array<{ role: string; content: string }>
): boolean {
  // Must have a valid contact detail
  if (!lead.email && !lead.phone) return false;

  // Key for deduplication
  const key = (lead.email || lead.phone || "").toLowerCase().trim();
  const lastSub = recentSubmissions.get(key);
  if (lastSub && Date.now() - lastSub < SUBMISSION_DEDUP_MS) {
    return false; // Already submitted recently
  }

  // Check explicit intent
  if (lead.handoffRequested) return true;

  const lowerMsg = userMessage.toLowerCase();
  const intentKeywords = [
    "contact me",
    "reach out",
    "call me",
    "email me",
    "send quote",
    "get in touch",
    "talk to someone",
    "callback",
    "speak to",
    "hire you",
    "start project",
    "nathi",
    "quote",
  ];

  if (intentKeywords.some((kw) => lowerMsg.includes(kw))) {
    return true;
  }

  // If Maya's last message asked for contact info and the user provided it
  const lastAssistantMsg = [...history].reverse().find((m) => m.role === "assistant")?.content.toLowerCase() || "";
  if (
    lastAssistantMsg.includes("email") ||
    lastAssistantMsg.includes("phone") ||
    lastAssistantMsg.includes("reach you") ||
    lastAssistantMsg.includes("contact") ||
    lastAssistantMsg.includes("details")
  ) {
    return true;
  }

  return false;
}

export async function submitMayaLead(
  lead: MayaLead,
  userMessage: string,
  history: Array<{ role: string; content: string }>
): Promise<{ success: boolean; submissionId?: string; duplicate?: boolean; error?: string }> {
  const base = process.env.MAYA_API_URL?.replace(/\/$/, "");
  const clientId = process.env.MAYA_CLIENT_ID;

  if (!base || !clientId) {
    return { success: false, error: "Lead service configuration missing" };
  }

  const key = (lead.email || lead.phone || "").toLowerCase().trim();
  const lastSub = recentSubmissions.get(key);
  if (lastSub && Date.now() - lastSub < SUBMISSION_DEDUP_MS) {
    return { success: true, submissionId: "already-submitted", duplicate: true };
  }

  // Construct conversation summary for details field
  const recentHistorySummary = history
    .slice(-4)
    .map((h) => `${h.role === "user" ? "Visitor" : "Maya"}: ${h.content}`)
    .join("\n");

  const detailsParts = [
    lead.goals ? `Goals/Requirements: ${lead.goals}` : "",
    lead.phone ? `Phone: ${lead.phone}` : "",
    `Latest Message: ${userMessage}`,
    recentHistorySummary ? `Recent Context:\n${recentHistorySummary}` : "",
  ].filter(Boolean).join("\n\n").slice(0, 2000);

  // Customer object MUST have name and email for the upstream API
  const customerName = lead.name || "Maya Website Lead";
  const customerEmail = lead.email || `phone-lead-${Date.now()}@mygrafixmedia.com`;

  const payload = {
    clientId,
    formName: "maya-chat",
    customer: {
      name: customerName,
      email: customerEmail,
    },
    fields: {
      company: lead.company || "",
      projectType: lead.projectType || "General Enquiry",
      details: detailsParts,
      phone: lead.phone || "",
      budget: lead.budget || "",
      timeline: lead.timeline || "",
      source: "Maya AI Concierge",
    },
    website: "https://mygrafixmedia.com",
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const res = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });

    const data = (await res.json().catch(() => null)) as { success?: boolean; submissionId?: string } | null;

    if (!res.ok || !data?.success) {
      return { success: false, error: `Upstream error status ${res.status}` };
    }

    if (key) {
      recentSubmissions.set(key, Date.now());
    }

    return { success: true, submissionId: data.submissionId };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Network failure" };
  } finally {
    clearTimeout(timeout);
  }
}
