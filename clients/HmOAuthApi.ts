async function exchangeAuthCodeWithToken(authCode: string) {
  const response = await fetch(`${process.env.HIGH_MOBILITY_OAUTH_BASE_URI}/access_tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: process.env.NEXT_PUBLIC_HIGH_MOBILITY_REDIRECT_URI,
      client_id: process.env.NEXT_PUBLIC_HIGH_MOBILITY_OAUTH_CLIENT_ID,
      client_secret: process.env.HIGH_MOBILITY_OAUTH_CLIENT_SECRET,
    }),
  })

  return response
}

async function exchangeTokenWithVehicleInfo(token: string) {
  const response = await fetch(`${process.env.HIGH_MOBILITY_OAUTH_BASE_URI}/vehicleinfo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}

export { exchangeAuthCodeWithToken, exchangeTokenWithVehicleInfo }