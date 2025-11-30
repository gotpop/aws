# AWS Lambda Services

AWS Lambda monorepo for gotpop platform email services and serverless functions.

## Stack

- **Runtime**: Node.js 22+ with TypeScript
- **Email**: AWS SES with React Email templates  
- **Deployment**: Serverless Framework 
- **Development**: Turbo monorepo with local email preview

## Structure

- `apps/email-lambda` - Contact form email service Lambda
- `apps/email-preview` - React Email template development
- `src/shared` - Shared utilities and types

## Development

```bash
yarn install        # Install dependencies
yarn dev           # Start all development servers
yarn build         # Build all apps
yarn deploy        # Deploy to AWS
yarn type-check    # TypeScript validation
yarn lint          # Code linting
```

## Email Service

The email Lambda handles contact form submissions by:

1. **User submits contact form** → Lambda receives request
2. **Confirmation email** sent to user (`noreply@gotpop.io`)
3. **Notification email** sent to admin Gmail with `Reply-To: user@email.com`
4. **Direct Gmail conversation** when you reply to user

## Local email dev
- **Preview UI**: React Email preview server 

```bash
# AWS Configuration (from existing gotpop infrastructure)
AWS_REGION=your-region
SES_FROM_EMAIL=noreply@gotpop.io
ADMIN_EMAIL=your@gmail.com

# Optional
SES_REPLY_TO_EMAIL=hello@gotpop.io
```

### React Email Preview (local)

```bash
cd apps/email-preview
yarn dev           # Start React Email preview server (http://localhost:3004)
```

### Static Email Export

```bash
cd apps/email-preview
yarn export:templates   # Export static HTML emails to /out
```

