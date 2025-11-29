import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Text,
} from "@react-email/components"

interface ContactConfirmationEmailProps {
  name: string
}

export const ContactConfirmationEmail = ({
  name = "{{John Doe}}",
}: ContactConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Thanks for contacting GotPop</Heading>
          
          <Text style={text}>Hi {name},</Text>
          
          <Text style={text}>
            Thanks for reaching out! I've received your message and will get back 
            to you as soon as possible, usually within 24 hours.
          </Text>
          
          <Text style={text}>
            In the meantime, feel free to check out my latest work and writing:
          </Text>
          
          <Text style={linkContainer}>
            • <Link href="https://gotpop.io" style={link}>gotpop.io</Link> - Blog & Writing<br />
            • <Link href="https://work.gotpop.io" style={link}>work.gotpop.io</Link> - Portfolio & Projects
          </Text>
          
          <Hr style={hr} />
          
          <Text style={footer}>
            Best regards,<br />
            GotPop
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

ContactConfirmationEmail.PreviewProps = {
  name: "John Doe",
} as ContactConfirmationEmailProps

export default ContactConfirmationEmail

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
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
  textAlign: "center" as const,
  padding: "0 40px",
}

const text = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
  padding: "0 40px",
  marginBottom: "10px",
}

const linkContainer = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
  padding: "0 40px",
  marginBottom: "20px",
}

const link = {
  color: "#ff6900",
  textDecoration: "none",
}

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
}

const footer = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#666666",
  padding: "0 40px",
}