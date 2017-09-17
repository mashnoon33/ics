import {
    setAlarm
} from '../utils'

function setGeolocation ({ lat, lon }) {
    return `${lat};${lon}`
}

export default function formatEvent (attributes = {}) {
  const {
    title,
    productId,
    uid,
    timestamp,
    start,
    duration,
    end,
    description,
    url,
    geolocation,
    location,
    status,
    categories,
    organizer,
    attendees,
    alarms
  } = attributes

    let icsFormat = ''
    icsFormat += 'BEGIN:VCALENDAR\r\n'
    icsFormat += 'VERSION:2.0\r\n'
    icsFormat += 'CALSCALE:GREGORIAN\r\n'
    icsFormat += `PRODID:${productId}\r\n`
    icsFormat += 'BEGIN:VEVENT\r\n'
    icsFormat += `UID:${uid}\r\n`
    icsFormat += `SUMMARY:${title}\r\n`
    icsFormat += `DTSTAMP:${timestamp}\r\n`
    icsFormat += `DTSTART:${start}\r\n`
    icsFormat += end ? `DTEND:${end}\r\n` : ''
    icsFormat += description ? `DESCRIPTION:${description}\r\n` : ''
    icsFormat += url ? `URL:${url}\r\n` : ''
    icsFormat += geolocation ? `GEO:${setGelolocation(geolocation)}\r\n` : ''
    icsFormat += location ? `LOCATION:${location}\r\n` : ''
    icsFormat += status ? `STATUS:${status}\r\n` : ''
    icsFormat += categories ? `CATEGORIES:${categories}\r\n` : ''
    icsFormat += organizer ? `ORGANIZER;${organizer}\r\n` : ''
    if (attendees) {
      attendees.map( attendee => icsFormat += `ATTENDEE;${attendee}\r\n` )
    }
    if (alarms) {
      alarms.map( alarm => icsFormat += alarm)
    }
    icsFormat += `END:VEVENT\r\n`
    icsFormat += `END:VCALENDAR\r\n`

    return icsFormat
  
}
