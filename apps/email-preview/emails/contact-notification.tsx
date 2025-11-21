import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Section,
    Text,
} from "@react-email/components"

interface ContactNotificationEmailProps {
  name: string
  email: string
  subject: string
  message: string
}

export const ContactNotificationEmail = ({
  name = "John Doe",
  email = "john@example.com",
  subject = "Interested in web development project",
  message = "Hi there! I'm interested in discussing a potential web development project with you. Could we set up a time to chat about the requirements and timeline?\n\nThanks!\nJohn",
}: ContactNotificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Contact Form Submission</Heading>
          
          <Section style={section}>
            <Text style={label}>From:</Text>
            <Text style={value}>{name} ({email})</Text>
          </Section>
          
          <Section style={section}>
            <Text style={label}>Subject:</Text>
            <Text style={value}>{subject}</Text>
          </Section>
          
          <Hr style={hr} />
          
          <Section style={section}>
            <Text style={label}>Message:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>
          
          <Hr style={hr} />
          
          <Text style={footer}>
            Reply to this email to respond directly to {name}.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

ContactNotificationEmail.PreviewProps = {
  name: "John Doe",
  email: "john@example.com", 
  subject: "Interested in web development project",
  message: "Hi there! I'm interested in discussing a potential web development project with you. Could we set up a time to chat about the requirements and timeline?\n\nThanks!\nJohn",
} as ContactNotificationEmailProps

export default ContactNotificationEmail

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
}

const heading = {
  fontSize: "24px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
  textAlign: "center" as const,
  padding: "0 40px",
  marginBottom: "30px",
}

const section = {
  padding: "0 40px",
  marginBottom: "16px",
}

const label = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#666666",
  margin: "0 0 4px 0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
}

const value = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#484848",
  margin: "0 0 16px 0",
}

const messageText = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#484848",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
  backgroundColor: "#f8f9fa",
  padding: "16px",
  borderRadius: "6px",
  border: "1px solid #e9ecef",
}

const hr = {
  borderColor: "#cccccc",
  margin: "32px 0",
}

const footer = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#666666",
  padding: "0 40px",
  textAlign: "center" as const,
  fontStyle: "italic" as const,
}