async function exchangeAuthCodeWithAccessToken(authCode: string) {
  const response = await fetch(`${process.env.HIGH_MOBILITY_REST_API_URI}/v1/access_tokens`, {
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

async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(`${process.env.HIGH_MOBILITY_REST_API_URI}/v1/access_tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env.NEXT_PUBLIC_HIGH_MOBILITY_OAUTH_CLIENT_ID,
      client_secret: process.env.HIGH_MOBILITY_OAUTH_CLIENT_SECRET,
    }),
  })

  return response
}

async function exchangeAccessTokenWithVehicleInfo(accessToken: string) {
  const response = await fetch(`${process.env.HIGH_MOBILITY_REST_API_URI}/v1/vehicleinfo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

export { exchangeAuthCodeWithAccessToken, exchangeAccessTokenWithVehicleInfo, refreshAccessToken }
