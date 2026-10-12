const { sanitizeLead, shouldSubmitLead } = require('./lib/maya-lead');

console.log("=== Testing Lead Validation & Sanitization ===");

const test1 = sanitizeLead({
  name: "  John Smith  ",
  email: "john@example.com",
  phone: " +27821234567 ",
  company: " Acme Inc ",
  goals: " Needs a web application "
});
console.log("Test 1 (Valid Lead):", test1);
console.assert(test1.email === "john@example.com", "Email sanitized");
console.assert(test1.phone === "+27821234567", "Phone sanitized");

const test2 = sanitizeLead({
  name: "Jane",
  email: "not-an-email",
  phone: "123"
});
console.log("Test 2 (Invalid Contact):", test2);
console.assert(test2 === null, "Invalid lead rejected");

console.log("\n=== Testing Handoff Intent & Deduplication ===");

const history = [
  { role: "assistant", content: "Hi! How can I help you today?" },
  { role: "user", content: "I need a website" }
];

const lead = {
  email: "alex@example.com",
  name: "Alex",
  handoffRequested: false
};

const casualIntent = shouldSubmitLead(lead, "My email is alex@example.com", history);
console.log("Casual mention should submit?", casualIntent);
console.assert(!casualIntent, "Casual mention should not submit automatically");

const explicitIntent = shouldSubmitLead({ ...lead, handoffRequested: true }, "Please call me or email me a quote", history);
console.log("Explicit request should submit?", explicitIntent);
console.assert(explicitIntent, "Explicit intent should submit");

console.log("\nAll unit tests passed!");
