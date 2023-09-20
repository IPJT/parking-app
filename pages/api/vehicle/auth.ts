import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    throw new Error('request method was not GET')
  }

  const {
    code: authCode,
    error: authError,
    state: authState,
  } = req.query as { code?: string; error?: string; state?: string }

  if (!authState) {
    throw new Error('authState was not set as a query param by High Mobility')
  }

  if (authCode) {
    const response = await fetch(`${process.env.OAUTH_TOKEN_URI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
      }),
    })

    if (response.status !== 200) {
      throw new Error(`Status code from /v1/access_tokens was ${response.status}`)
    }

    const data = await response.json()
    console.log({ data })
  } else {
  }

  res.redirect('/')
}
