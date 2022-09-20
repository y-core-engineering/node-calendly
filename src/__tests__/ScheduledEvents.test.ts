/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Tue Sep 20 2022
 *  File : ScheduledEvents.test.ts
 *******************************************/
import { config } from 'dotenv';
import Calendly from '../Calendly';
config();

const CALENDLY_ACCESS_TOKEN = process.env.CALENDLY_ACCESS_TOKEN || '';

let calendly: Calendly;

jest.spyOn(global, 'fetch').mockImplementation(
    jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    collection: [
                        {
                            uri: 'https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2',

                            name: '15 Minute Meeting',

                            status: 'active',

                            start_time: '2019-08-24T14:15:22.123456Z',

                            end_time: '2019-08-24T14:15:22.123456Z',

                            event_type:
                                'https://api.calendly.com/event_types/GBGBDCAADAEDCRZ2',

                            location: {
                                type: 'physical',

                                location: 'Calendly Office'
                            },

                            invitees_counter: {
                                total: 0,

                                active: 0,

                                limit: 0
                            },

                            created_at: '2019-01-02T03:04:05.092125Z',

                            updated_at: '2019-01-02T03:04:05.092125Z',

                            event_memberships: [
                                {
                                    user: 'https://api.calendly.com/users/GBGBDCAADAEDCRZ2'
                                }
                            ],

                            event_guests: [
                                {
                                    email: 'user@example.com',

                                    created_at: '2022-04-21T17:10:48.484945Z',

                                    updated_at: '2022-04-21T17:11:01.758636Z'
                                }
                            ]
                        }
                    ],

                    pagination: {
                        count: 1,

                        next_page:
                            'https://api.calendly.com/scheduled_events?count=1&page_token=sNjq4TvMDfUHEl7zHRR0k0E1PCEJWvdi',

                        previous_page:
                            'https://api.calendly.com/scheduled_events?count=1&page_token=VJs2rfDYeY8ahZpq0QI1O114LJkNjd7H',

                        next_page_token: 'sNjq4TvMDfUHEl7zHRR0k0E1PCEJWvdi',

                        previous_page_token: 'VJs2rfDYeY8ahZpq0QI1O114LJkNjd7H'
                    }
                })
        })
    ) as jest.Mock
);

beforeEach(() => {
    calendly = new Calendly(CALENDLY_ACCESS_TOKEN);
    jest.clearAllMocks();
});

test('should get scheduled events', async () => {
    const scheduledEvents = await calendly.scheduledEvents.listEvents({});
    expect(scheduledEvents).toBeDefined();
});

test('should get scheduled events with organization', async () => {
    const scheduledEvents = await calendly.scheduledEvents.listEvents({
        organization: 'https://api.calendly.com/organizations/123'
    });
    expect(scheduledEvents).toBeDefined();
    expect(scheduledEvents).toHaveProperty('collection');
    expect(scheduledEvents).toHaveProperty('pagination');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
        'https://api.calendly.com/scheduled_events?organization=https://api.calendly.com/organizations/123',
        {
            headers: {
                Authorization: `Bearer ${CALENDLY_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }
    );
});

test('List event invitees', async () => {
    const scheduledEvents = await calendly.scheduledEvents.listEventInvitees(
        'GBGBDCAADAEDCRZ2',
        { count: 100 }
    );

    expect(scheduledEvents).toBeDefined();
    expect(scheduledEvents).toHaveProperty('collection');
    expect(scheduledEvents).toHaveProperty('pagination');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
        'https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2/invitees?count=100',
        {
            headers: {
                Authorization: `Bearer ${CALENDLY_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }
    );
});
