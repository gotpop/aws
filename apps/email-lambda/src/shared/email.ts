import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"

export function getEmailConfig() {
  return {
    fromEmail: process.env.SES_FROM_EMAIL || "noreply@gotpop.io",
    replyToEmail: process.env.SES_REPLY_TO_EMAIL || "hello@gotpop.io", 
    adminEmail: process.env.ADMIN_EMAIL!,
    region: process.env.AWS_REGION || "us-east-1",
  }
}

export function createSESClient(region: string): SESClient {
  return new SESClient({ region })
}

export async function sendEmail(params: {
  sesClient: SESClient
  from: string
  to: string
  replyTo?: string
  subject: string
  htmlBody: string
  textBody?: string
}): Promise<void> {
  const { sesClient, from, to, replyTo, subject, htmlBody, textBody } = params

  const command = new SendEmailCommand({
    Source: from,
    Destination: {
      ToAddresses: [to],
    },
    ReplyToAddresses: replyTo ? [replyTo] : undefined,
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: htmlBody,
          Charset: "UTF-8",
        },
        ...(textBody && {
          Text: {
            Data: textBody,
            Charset: "UTF-8",
          },
        }),
      },
    },
  })

  await sesClient.send(command)
}
