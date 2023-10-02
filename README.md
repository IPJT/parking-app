This repo was initiated by cloning this [example](https://github.com/grafbase/grafbase/tree/main/examples/nextjs-clerk).

## Development

1. Run `pnpm install` to install dependencies
2. Run `npx grafbase dev` to start local dev server with your schema
3. Run `npm run dev`, or `yarn dev` (in a new terminal)
4. Visit [http://localhost:3000](http://localhost:3000)

## Production Deployment

1. Push to main (This will deploy to Grafbase and Vercel)

## Environment variables - NextJs

- Put all secrets for NextJs in `.env.local` (dev) or in Vercel (prod)
- Generic non secret env-variables are put in `.env` - Included in repo
- Environment specific env-variables are put in `.env.development` or `.env.production` - Included in repo
