import Joi from 'joi'

const contactSchema = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().email()
})

const alarmSchema = Joi.object().keys({
  action: Joi.string().regex(/audio|display|email/).required(),
  trigger: Joi.string().required(),
  description: Joi.string(),
  duration: Joi.string(),
  repeat: Joi.number(),
  attach: Joi.string().uri(),
  summary: Joi.string(),
  attendee: contactSchema,
  'x-prop': Joi.any(),
  'iana-prop': Joi.any()
})

export const schema = Joi.object().keys({
  title: Joi.string(),
  productId: Joi.string(),
  uid: Joi.string().required(),
  start: Joi.string().required(),
  startType: Joi.string(), // TODO test
  end: Joi.string(), // TODO test
  description: Joi.string(),
  url: Joi.string().uri(),
  geolocation: Joi.object().keys({ lat: Joi.number(), lon: Joi.number() }),
  location: Joi.string(),
  status: Joi.string().regex(/tentative|cancelled|confirmed/),
  categories: Joi.array().items(Joi.string()),
  organizer: contactSchema,
  attendees: Joi.array().items(contactSchema),
  alarms: Joi.array().items(alarmSchema)
})

export default function validateEvent(candidate, cb) {
  const { error, value } = Joi.validate(candidate, schema)
  // console.log(error)
  // console.log(value)
  return { error, value }
}
