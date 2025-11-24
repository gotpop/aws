import { z } from "zod"

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message too long"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export interface EmailConfig {
  fromEmail: string
  replyToEmail: string
  adminEmail: string
  region: string
}

export interface ContactEmailResult {
  success: boolean
  message: string
  error?: string
}
