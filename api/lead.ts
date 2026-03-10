declare const process: {
  env: Record<string, string | undefined>;
};

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req: Request) {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
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

    console.log("Lead API called", {
      type,
      email,
      hasApiKey: !!RESEND_API_KEY,
      hasLeadEmail: !!LEAD_TO_EMAIL,
    });

    if (!RESEND_API_KEY || !LEAD_TO_EMAIL) {
      return new Response(JSON.stringify({ error: "Missing server env vars" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!type) {
      return new Response(JSON.stringify({ error: "Missing type" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const subjectMap: Record<string, string> = {
      CONTACT_FORM: `New Website Enquiry — ${email}`,
      LIVE_CHAT: `Live Chat Request — ${email}`,
      CHAT_LIVE_REQUEST: `Live Chat Request — ${email}`,
      CAREERS: `Careers Application — ${email}`,
      AUDIT: `Audit Request — ${email}`,
      WELCOME_CODE: `Audit Request — ${email}`,
    };

    const subject = subjectMap[type] || `New Lead — ${email}`;

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>${escapeHtml(subject)}</h2>
        <p><strong>Type:</strong> ${escapeHtml(type)}</p>
        ${name ? `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` : ""}
        ${email ? `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` : ""}
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        ${source ? `<p><strong>Source:</strong> ${escapeHtml(source)}</p>` : ""}
        ${pageUrl ? `<p><strong>Page:</strong> ${escapeHtml(pageUrl)}</p>` : ""}
        ${
          message
            ? `<p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`
            : ""
        }
        ${
          meta
            ? `<hr/><p><strong>Meta:</strong></p>
               <pre style="background:#f6f6f6;padding:12px;border-radius:10px;overflow:auto">${escapeHtml(
                 JSON.stringify(meta, null, 2)
               )}</pre>`
            : ""
        }
      </div>
    `;

    const payload: any = {
      from: "NIXRIX <onboarding@resend.dev>",
      to: [LEAD_TO_EMAIL],
      subject,
      html,
    };

    if (email) {
      payload.replyTo = email;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    let resendResponse: Response;
    try {
      resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } catch (err: any) {
      clearTimeout(timeout);
      console.error("Resend fetch failed:", err);
      return new Response(
        JSON.stringify({
          error: "Resend request failed",
          details: err?.name === "AbortError" ? "Request timed out" : String(err),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    clearTimeout(timeout);

    const raw = await resendResponse.text().catch(() => "");
    console.log("Resend status:", resendResponse.status, raw);

    if (!resendResponse.ok) {
      return new Response(
        JSON.stringify({
          error: "Email failed",
          details: raw || "Unknown Resend error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Lead API unexpected error:", err);
    return new Response(
      JSON.stringify({
        error: "Unexpected server error",
        details: String(err),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
