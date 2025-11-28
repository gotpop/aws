import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          success: false,
          message: "Request body is required",
        }),
      }
    }

    const data = JSON.parse(event.body)
    // Minimal validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          success: false,
          message: "Missing required fields",
        }),
      }
    }

    // Config from env
    const FROM_EMAIL = process.env.SES_FROM_EMAIL || "noreply@gotpop.io"
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "hello@gotpop.io"
    const REGION = process.env.AWS_REGION || "us-east-1"

    const sesClient = new SESClient({ region: REGION })

    // Inline confirmation email HTML
    const confirmationHtml = `<html><body><h1>Thanks for contacting GotPop</h1><p>Hi ${data.name},</p><p>Thanks for reaching out! I'll get back to you soon.</p></body></html>`

    // Send confirmation email to user
    await sesClient.send(new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [data.email] },
      Message: {
        Subject: { Data: "Thanks for contacting GotPop", Charset: "UTF-8" },
        Body: { Html: { Data: confirmationHtml, Charset: "UTF-8" } },
      },
    }))

    // Inline notification email HTML
    const notificationHtml = `<html><body>
      <h2>New Contact Form Submission</h2>
      <p><b>Name:</b> ${data.name} (${data.email})</p>
      <p><b>Subject:</b> ${data.subject}</p>
      <p><b>Message:</b></p>
      <div style="margin:1em 0;padding:1em;background:#f9f9f9;border-radius:6px;border:1px solid #eee;">
        ${data.message}
      </div>
    </body></html>`

    // Send notification email to admin
    await sesClient.send(new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [ADMIN_EMAIL] },
      ReplyToAddresses: [data.email],
      Message: {
        Subject: { Data: data.subject, Charset: "UTF-8" },
        Body: { Html: { Data: notificationHtml, Charset: "UTF-8" } },
      },
    }))

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        message: "Email sent successfully",
      }),
    }
  } catch (error) {
    console.error("Contact form error:", JSON.stringify(error, null, 2))
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: false,
        message: "Failed to send email",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    }
  }
}