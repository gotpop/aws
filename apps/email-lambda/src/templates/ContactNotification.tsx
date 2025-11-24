
export function getContactNotificationEmail({ name, email, subject, message }: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>New Contact Form Submission</title>
      </head>
      <body style="background-color:#f6f9fc;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
        <div style="background-color:#fff;margin:0 auto;padding:20px 0 48px;margin-bottom:64px;max-width:600px;">
          <h2 style="font-size:24px;line-height:1.3;font-weight:700;color:#484848;text-align:center;padding:0 40px;margin-bottom:30px;">New Contact Form Submission</h2>
          <div style="padding:0 40px;margin-bottom:16px;">
            <div style="font-size:14px;font-weight:600;color:#666;margin:0 0 4px 0;text-transform:uppercase;letter-spacing:0.5px;">From:</div>
            <div style="font-size:16px;line-height:24px;color:#484848;margin:0 0 16px 0;">${name} (${email})</div>
          </div>
          <div style="padding:0 40px;margin-bottom:16px;">
            <div style="font-size:14px;font-weight:600;color:#666;margin:0 0 4px 0;text-transform:uppercase;letter-spacing:0.5px;">Subject:</div>
            <div style="font-size:16px;line-height:24px;color:#484848;margin:0 0 16px 0;">${subject}</div>
          </div>
          <hr style="border-color:#cccccc;margin:32px 0;" />
          <div style="padding:0 40px;margin-bottom:16px;">
            <div style="font-size:14px;font-weight:600;color:#666;margin:0 0 4px 0;text-transform:uppercase;letter-spacing:0.5px;">Message:</div>
            <div style="font-size:16px;line-height:24px;color:#484848;margin:0;background-color:#f8f9fa;padding:16px;border-radius:6px;border:1px solid #e9ecef;white-space:pre-wrap;">${message}</div>
          </div>
          <hr style="border-color:#cccccc;margin:32px 0;" />
          <div style="font-size:14px;line-height:20px;color:#666;padding:0 40px;text-align:center;font-style:italic;">
            Reply to this email to respond directly to ${name}.
          </div>
        </div>
      </body>
    </html>
  `;
}