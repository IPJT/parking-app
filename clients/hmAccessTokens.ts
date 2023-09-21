async function exchangeAuthCodeWithToken(authCode: string) {
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

  return response
}

export { exchangeAuthCodeWithToken }
