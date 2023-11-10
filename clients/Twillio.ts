import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

if (!accountSid || !authToken) {
  throw new Error('Twilio environment variables not defined')
}

const client = twilio(accountSid, authToken)

export function sendSms({ body, to }: { body: string; to: string }) {
  client.messages
    .create({
      body,
      to,
      from: '+15017122661',
    })
    .then((message) => console.log({ messageSID: message.sid, messageStatus: message.status }))
}
