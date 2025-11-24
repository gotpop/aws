
export function getContactConfirmationEmail(name: string): string {
  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Thanks for contacting GotPop</title>
      </head>
      <body style="background-color:#f6f9fc;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
        <div style="background-color:#fff;margin:0 auto;padding:20px 0 48px;margin-bottom:64px;max-width:600px;">
          <h1 style="font-size:32px;line-height:1.3;font-weight:700;color:#484848;text-align:center;padding:0 40px;">Thanks for contacting GotPop</h1>
          <p style="font-size:16px;line-height:26px;color:#484848;padding:0 40px;margin-bottom:10px;">Hi ${name},</p>
          <p style="font-size:16px;line-height:26px;color:#484848;padding:0 40px;margin-bottom:10px;">
            Thanks for reaching out! I've received your message and will get back to you as soon as possible, usually within 24 hours.
          </p>
          <p style="font-size:16px;line-height:26px;color:#484848;padding:0 40px;margin-bottom:10px;">
            In the meantime, feel free to check out my latest work and writing:
          </p>
          <p style="font-size:16px;line-height:26px;color:#484848;padding:0 40px;margin-bottom:20px;">
            • <a href="https://gotpop.io" style="color:#ff6900;text-decoration:none;">gotpop.io</a> - Blog & Writing<br />
            • <a href="https://work.gotpop.io" style="color:#ff6900;text-decoration:none;">work.gotpop.io</a> - Portfolio & Projects
          </p>
          <hr style="border-color:#cccccc;margin:20px 0;" />
          <p style="font-size:14px;line-height:24px;color:#666;padding:0 40px;">
            Best regards,<br />
            GotPop
          </p>
        </div>
      </body>
    </html>
  `;
}