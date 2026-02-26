// api/lead.ts

function escapeHtml(str: string) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const type = String(body?.type || "").trim();
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim();
  const phone = String(body?.phone || "").trim();
  const message = String(body?.message || "").trim();
  const source = String(body?.source || "").trim();
  const pageUrl = String(body?.pageUrl || "").trim();
  const meta = body?.meta ? body.meta : null;

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const LEAD_TO_EMAIL = process.env.LEAD_TO_EMAIL;

  if (!RESEND_API_KEY || !LEAD_TO_EMAIL) {
    return new Response(JSON.stringify({ error: "Missing server env vars" }), { status: 500 });
  }

  if (!type) return new Response(JSON.stringify({ error: "Missing type" }), { status: 400 });

  // Require at least one contact method for lead types
  const needsContact = ["CONTACT_FORM", "LIVE_CHAT", "CHAT_LIVE_REQUEST", "CAREERS", "AUDIT", "WELCOME_CODE"].includes(type);
  if (needsContact && !email && !phone) {
    return new Response(JSON.stringify({ error: "Missing email or phone" }), { status: 400 });
  }

  const id = email || phone || "unknown";

  const subjectMap: Record<string, string> = {
    CONTACT_FORM: `New Website Enquiry — ${id}`,
    LIVE_CHAT: `Live Chat Request — ${id}`,
    CHAT_LIVE_REQUEST: `Live Chat Request — ${id}`,
    CAREERS: `Careers Application — ${id}`,
    AUDIT: `Audit Request — ${id}`,
    WELCOME_CODE: `Audit Request — ${id}`, // compatibility
  };

  const subject = subjectMap[type] || `New Lead — ${id}`;

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5">
      <h2>${escapeHtml(subject)}</h2>

      <p><strong>Type:</strong> ${escapeHtml(type)}</p>
      ${name ? `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` : ""}
      ${email ? `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` : ""}
      ${phone ? `<p><strong>Phone/WhatsApp:</strong> ${escapeHtml(phone)}</p>` : ""}
      ${source ? `<p><strong>Source:</strong> ${escapeHtml(source)}</p>` : ""}
      ${pageUrl ? `<p><strong>Page:</strong> ${escapeHtml(pageUrl)}</p>` : ""}

      ${message ? `<p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>` : ""}

      ${
        meta
          ? `<hr/><p style="margin:0 0 6px 0;"><strong>Meta:</strong></p>
             <pre style="background:#f6f6f6;padding:12px;border-radius:10px;overflow:auto">${escapeHtml(
               JSON.stringify(meta, null, 2)
             )}</pre>`
          : ""
      }
    </div>
  `;

  // Resend API uses `reply_to` (snake_case). :contentReference[oaicite:1]{index=1}
  const payload: any = {
    from: "NIXRIX <onboarding@resend.dev>",
    to: [LEAD_TO_EMAIL],
    subject,
    html,
  };

  if (email) payload.reply_to = email;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    return new Response(JSON.stringify({ error: "Email failed", details }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
