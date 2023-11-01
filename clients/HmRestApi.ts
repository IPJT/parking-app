import { v4 as uuidv4 } from 'uuid'
import { sign } from 'jsonwebtoken'

const HIGH_MOBILITY_REST_API_URI = process.env.HIGH_MOBILITY_REST_API_URI

const REST_API_CONFIG = {
  version: '3.0',
  type: 'rest_api',
  private_key_id: '10facd10-620b-4bb1-9d99-061274bf727d',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgfm/KEJF5KOL8dwIt\nNtuF8bRSLDy5BBgJdhBeq186sgOhRANCAAS43MBX1cudutDsThg9LQ9uEceVXo5W\nO+CixhHykKVPV6jU44Hn2EsZr39Ls+GqSUr7JdM/kLEfMFE2S4HQTSXH\n-----END PRIVATE KEY-----\n\n',
  app_uri: 'https://sandbox.rest-api.high-mobility.com/v5',
  app_id: '3771054293597BB1BFCD2DED',

  client_serial_number: '643437FAC1B98F2530',
}

function createJwt(accessToken: string) {
  const payload = {
    ver: REST_API_CONFIG.version,
    aud: REST_API_CONFIG.app_uri,
    iss: REST_API_CONFIG.client_serial_number,
    iat: Math.round(Date.now() / 1000),
    jti: uuidv4(),
    sub: accessToken,
  }

  const privateKey = Buffer.from(REST_API_CONFIG.private_key, 'utf8')
  const jwtToken = sign(payload, privateKey, { algorithm: 'ES256' })

  return jwtToken
}

export async function fetchVehicleLocation(accessToken: string) {
  const jwt = createJwt(accessToken)

  const response = await fetch(`${HIGH_MOBILITY_REST_API_URI}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  const responseJson = await response.json() //TODO-ian. Parse/zod-validate

  return responseJson
}
