// api/lead.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

type Lead =
  | {
      type: "WELCOME_CODE";
      email: string;
      source: "homepage";
      pageUrl: string;
      meta?: Record<string, string>;
    }
  | {
      type: "CONTACT_FORM";
      name: string;
      email: string;
      phone?: string;
      businessType: string;
      serviceInterest: string;
      message: string;
      welcomeCode?: string;
      source: "contact";
      pageUrl: string;
    }
  | {
      type: "CHAT_LIVE_REQUEST";
      name: string;
      email: string;
      phone?: string;
      message?: string;
      welcomeCode?: string;
      source: "chatbot";
      pageUrl: string;
    };

function json(res: VercelResponse, status: number, data: any) {
  res.status(status).setHeader("Content-Type", "application/json").send(JSON.stringify(data));
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeStr(v: unknown, max = 5000) {
  const s = String(v ?? "").trim();
  return s.length > max ? s.slice(0, max) + "…" : s;
}

function isEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS (so it works on your Vercel domain + local dev)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Method not allowed" });

  const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
  const LEAD_TO_EMAIL = process.env.LEAD_TO_EMAIL || "";
  const LEAD_FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "";

  if (!RESEND_API_KEY || !LEAD_TO_EMAIL || !LEAD_FROM_EMAIL) {
    return json(res, 500, { ok: false, error: "Server email env vars not set" });
  }

  let body: any = req.body;

  // If body comes as string for any reason
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return json(res, 400, { ok: false, error: "Invalid JSON" });
    }
  }

  // Basic anti-abuse checks
  const type = safeStr(body?.type, 50);
  const email = safeStr(body?.email, 254);

  if (!type) return json(res, 400, { ok: false, error: "Missing type" });
  if (!email || !isEmail(email)) return json(res, 400, { ok: false, error: "Invalid email" });

  // Build email content
  const timestamp = new Date().toISOString();

  const subject = `[NIXRIX Lead] ${type} — ${email}`;
  const source = safeStr(body?.source, 50);
  const pageUrl = safeStr(body?.pageUrl, 2000);

  const lines: string[] = [
    `Type: ${type}`,
    `Source: ${source}`,
    `Email: ${email}`,
    `Time: ${timestamp}`,
    `Page: ${pageUrl}`,
    "",
  ];

  // Add type-specific fields
  if (type === "WELCOME_CODE") {
    lines.push(`Welcome Code: ${safeStr(body?.meta?.code || body?.welcomeCode || "", 100)}`);
  }

  if (type === "CONTACT_FORM") {
    lines.push(`Name: ${safeStr(body?.name, 200)}`);
    lines.push(`Phone: ${safeStr(body?.phone || "", 100)}`);
    lines.push(`Business Type: ${safeStr(body?.businessType, 120)}`);
    lines.push(`Service Interest: ${safeStr(body?.serviceInterest, 180)}`);
    lines.push(`Welcome Code: ${safeStr(body?.welcomeCode || "", 100)}`);
    lines.push("");
    lines.push("Message:");
    lines.push(safeStr(body?.message, 8000));
  }

  if (type === "CHAT_LIVE_REQUEST") {
    lines.push(`Name: ${safeStr(body?.name, 200)}`);
    lines.push(`Phone: ${safeStr(body?.phone || "", 100)}`);
    lines.push(`Welcome Code: ${safeStr(body?.welcomeCode || "", 100)}`);
    lines.push("");
    lines.push("Message:");
    lines.push(safeStr(body?.message || "", 8000));
  }

  const textBody = lines.join("\n");

  const htmlBody = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto; line-height: 1.5;">
      <h2>NIXRIX Lead</h2>
      <pre style="background:#f6f7f9;border:1px solid #e5e7eb;border-radius:12px;padding:16px;white-space:pre-wrap;">${escapeHtml(
        textBody
      )}</pre>
    </div>
  `;

  // Send via Resend REST API (no extra package needed)
  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: LEAD_FROM_EMAIL,
        to: [LEAD_TO_EMAIL],
        subject,
        text: textBody,
        html: htmlBody,
        reply_to: email, // makes replying easy
      }),
    });

    if (!resp.ok) {
      const t = await resp.text();
      return json(res, 502, { ok: false, error: "Email provider failed", detail: t.slice(0, 300) });
    }

    return json(res, 200, { ok: true });
  } catch (err: any) {
    return json(res, 500, { ok: false, error: "Server error", detail: String(err?.message || err) });
  }
}
