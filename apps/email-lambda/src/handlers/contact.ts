import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function handler(
	event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
	const fs = require("node:fs");
	const path = require("node:path");

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
			};
		}

		const data = JSON.parse(event.body);

		// Validation
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
			};
		}

		const FROM_EMAIL = process.env.SES_FROM_EMAIL || "noreply@gotpop.io";
		const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "hello@gotpop.io";
		const REGION = process.env.AWS_REGION || "eu-west-2";

		const sesClient = new SESClient({ region: REGION });

		// Helper to read template file contents
		function getTemplateHtml(templateName: string): string {
			const filePath = path.join(
				__dirname,
				"..",
				"templates",
				`${templateName}.html`,
			);
			return fs.readFileSync(filePath, "utf8");
		}

		let confirmationHtml = getTemplateHtml("contact-confirmation");

		confirmationHtml = confirmationHtml
			.replace(/{{name}}/g, data.name)
			.replace(/{{email}}/g, data.email)
			.replace(/{{subject}}/g, data.subject)
			.replace(/{{message}}/g, data.message);

		// Send confirmation email to user
		await sesClient.send(
			new SendEmailCommand({
				Source: FROM_EMAIL,
				Destination: { ToAddresses: [data.email] },
				Message: {
					Subject: { Data: "Thanks for contacting GotPop", Charset: "UTF-8" },
					Body: { Html: { Data: confirmationHtml, Charset: "UTF-8" } },
				},
			}),
		);

		let notificationHtml = getTemplateHtml("contact-notification");

		notificationHtml = notificationHtml
			.replace(/{{name}}/g, data.name)
			.replace(/{{email}}/g, data.email)
			.replace(/{{subject}}/g, data.subject)
			.replace(/{{message}}/g, data.message);

		// Send notification email to admin with content
		await sesClient.send(
			new SendEmailCommand({
				Source: FROM_EMAIL,
				Destination: { ToAddresses: [ADMIN_EMAIL] },
				ReplyToAddresses: [data.email],
				Message: {
					Subject: { Data: data.subject, Charset: "UTF-8" },
					Body: { Html: { Data: notificationHtml, Charset: "UTF-8" } },
				},
			}),
		);

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
		};
	} catch (error) {
		console.error("Contact form error:", JSON.stringify(error, null, 2));
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
		};
	}
}
