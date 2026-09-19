import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FIELD = 2000;

function apiEndpoint() {
  const base = process.env.MAYA_API_URL?.replace(/\/$/, "");
  /* Conventions match the other intake routes: the env var is the
     service root, and each route names its own resource. */
  return base ? `${base}/api/contact` : null;
}

function clean(value: unknown, max = MAX_FIELD) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const endpoint = apiEndpoint();
  const clientId = process.env.MAYA_CLIENT_ID;
  if (!endpoint || !clientId) {
    return NextResponse.json({ success: false, error: "The enquiry service is temporarily unavailable." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Please check the form and try again." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const name = clean(input.name, 120);
  const email = clean(input.email, 240);
  const company = clean(input.company, 160);
  const projectType = clean(input.projectType, 120);
  const details = clean(input.details, 2000);
  const budget = clean(input.budget, 120);
  const timeline = clean(input.timeline, 120);

  if (!name || !email || !projectType || !details) {
    return NextResponse.json({ success: false, error: "Please complete the required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        clientId,
        formName: "contact",
        customer: { name, email },
        fields: { company, projectType, details, budget, timeline },
        website: "https://mygrafixmedia.com",
      }),
      signal: controller.signal,
      cache: "no-store",
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.success) {
      return NextResponse.json({ success: false, error: "We could not send your enquiry. Please try again or email us directly." }, { status: response.status >= 500 ? 502 : response.status });
    }
    return NextResponse.json({ success: true, submissionId: data.submissionId });
  } catch {
    return NextResponse.json({ success: false, error: "We could not connect to the enquiry service. Please email us directly." }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
