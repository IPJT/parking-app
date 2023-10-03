This repo was initiated by cloning this [example](https://github.com/grafbase/grafbase/tree/main/examples/nextjs-clerk).

# Development

1. Run `pnpm install` to install dependencies
2. Run `npx grafbase dev` to start local dev server with your schema
3. Run `npm run dev`, or `yarn dev` (in a new terminal)
4. Visit [http://localhost:3000](http://localhost:3000)

## Logging

- The below goes for both for the frontend and backend (client, edge & server function)
- Logs are captured in [Sentry](https://parking-app.sentry.io/issues/?environment=vercel-production)
- Unhandled exceptions are logged in Sentry automatically
- Manually log an error by running `Sentry.captureException(new Error("custom error"));` or `Sentry.captureException(error);` in catch statement
- Manually log a message by running `Sentry.captureMessage("this is a debug message");`. The level is `info` by default
- Errors and messages will show up as [Issues](https://parking-app.sentry.io/issues/?environment=vercel-production) in Sentry. In order to move the out of the issues stream do one of the [following](https://docs.sentry.io/product/issues/states-triage/?original_referrer=https://docs.sentry.io/?original_referrer%3Dhttps%253A%252F%252Fdocs.sentry.io%252F):
  - Mark as resolved when it's been fixed
  - Set status to `Archived`

## Production Deployment

1. Push to main (This will deploy to Grafbase and Vercel)

## Environment variables - NextJs

- Put all secrets for NextJs in `.env.local` (dev) or in Vercel (prod)
- Generic non secret env-variables are put in `.env` - Included in repo
- Environment specific env-variables are put in `.env.development` or `.env.production` - Included in repo
