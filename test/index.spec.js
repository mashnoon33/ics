import { expect } from 'chai'
import { createEvent } from '../src'

describe('.createEvent', () => {
  it('builds and formats a default event when no params passed', () => {
    const event = createEvent()
    expect(event).to.contain('BEGIN:VCALENDAR')
    expect(event).to.contain('VERSION:2.0')
    expect(event).to.contain('PRODID:adamgibbons/ics')
    expect(event).to.contain('BEGIN:VEVENT')
    expect(event).to.contain('SUMMARY:Untitled event')
    expect(event).to.contain('UID:')
    expect(event).to.contain('DTSTART:')
    expect(event).to.contain('DTSTAMP:20')
    expect(event).to.contain('END:VEVENT')
    expect(event).to.contain('END:VCALENDAR')
  })
  it('handles arguments', () => {
    const event = createEvent({
      start: [2017],
      title: 'Bolder Boulder',
      uid: 'xyz',
      productId: 'GibbonsInc',
      description: 'Annual Memorial Day 10k Race in Boulder, Colorado',
      url: 'http://bb10k.bolderboulder.com/',
      location: 'Folsom Field, University of Colorado at Boulder',
      geolocation: {
        lat: 40.0095,
        lon: -105.2669
      },
      status: 'tentative',
      categories: ['Memorial Day', '10k races'],
      organizer: {
        name: 'John Smith',
        email: 'jsmith@example.com'
      },
      attendees: [
        {
          name: 'Adam Gibbons',
          email: 'agibbons@example.com'
        },
        {
          name: 'Brittany Seaton',
          email: 'bseaton@example.com'
        }
      ],
      start: [1997, 6, 14, 11, 30],
      duration: {
        hours: 1
      }
    })

    console.log(event)

    expect(event).to.contain('PRODID:GibbonsInc')
    expect(event).to.contain('SUMMARY:Bolder Boulder')
    expect(event).to.contain('DESCRIPTION:Annual Memorial Day 10k Race in Boulder, Colorado')
    expect(event).to.contain('UID:xyz')
    expect(event).to.contain('URL:http://bb10k.bolderboulder.com/')
    expect(event).to.contain('GEO:40.0095;-105.2669')
    expect(event).to.contain('LOCATION:Folsom Field, University of Colorado at Boulder')
    expect(event).to.contain('STATUS:tentative')
    expect(event).to.contain('CATEGORIES:Memorial Day,10k races')
    expect(event).to.contain('ORGANIZER;CN=John Smith:mailto:jsmith@example.com')
    expect(event).to.contain('ATTENDEE;CN=Adam Gibbons:mailto:agibbons@example.com')
    expect(event).to.contain('ATTENDEE;CN=Brittany Seaton:mailto:bseaton@example.com')
    expect(event).to.contain('DTSTART:19970714T173000Z')
    expect(duration).to.contain('DURATION:P15DT5H0M20S')
  })
})
