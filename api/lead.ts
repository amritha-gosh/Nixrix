export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const { type, name, email, message } = await req.json();

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const LEAD_TO_EMAIL = process.env.LEAD_TO_EMAIL;

  if (!RESEND_API_KEY || !LEAD_TO_EMAIL) {
    return new Response(JSON.stringify({ error: "Server config missing" }), {
      status: 500,
    });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "NIXRIX <onboarding@resend.dev>",
      to: LEAD_TO_EMAIL,
      subject:
        type === "LIVE_CHAT"
          ? "New Live Chat Request"
          : "New Website Enquiry",
      html: `
        <h2>New Enquiry</h2>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Name:</strong> ${name || "-"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    }),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Email failed" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
