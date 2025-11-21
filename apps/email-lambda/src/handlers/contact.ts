import { render } from "@react-email/render"
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { createSESClient, getEmailConfig, sendEmail } from "../../shared/email"
import type { ContactEmailResult } from "../../shared/types"
import { contactFormSchema } from "../../shared/types"
import { ContactConfirmationEmail } from "../templates/ContactConfirmation"
import { ContactNotificationEmail } from "../templates/ContactNotification"

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    // Parse and validate request body
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
        } satisfies ContactEmailResult),
      }
    }

    const requestData = JSON.parse(event.body)
    const validatedData = contactFormSchema.parse(requestData)

    // Get email configuration
    const config = getEmailConfig()
    const sesClient = createSESClient(config.region)

    // Send confirmation email to user
    const confirmationHtml = render(
      ContactConfirmationEmail({ name: validatedData.name })
    )
    
    await sendEmail({
      sesClient,
      from: config.fromEmail,
      to: validatedData.email,
      subject: "Thanks for contacting GotPop",
      htmlBody: confirmationHtml,
    })

    // Send notification email to admin with user's email as reply-to
    const notificationHtml = render(
      ContactNotificationEmail({
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
      })
    )

    await sendEmail({
      sesClient,
      from: config.fromEmail,
      to: config.adminEmail,
      replyTo: validatedData.email, // Enable direct Gmail conversation
      subject: `Contact Form: ${validatedData.subject}`,
      htmlBody: notificationHtml,
    })

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        message: "Email sent successfully",
      } satisfies ContactEmailResult),
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
      } satisfies ContactEmailResult),
    }
  }
}