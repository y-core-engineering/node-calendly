/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Tue Sep 20 2022
 *  File : ActivityLog.test.ts.ts
 *******************************************/
import { config } from 'dotenv';
import Calendly from '../Calendly';
import ActivityLog from '../endpoints/ActivityLog';
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
                            occurred_at: '2020-01-02T03:04:05.678Z',
                            uri: 'https://api.calendly.com/activity_log_entries/ALFKJELNCLKSJDLKFJGELKJ',
                            namespace: 'User',
                            action: 'Add',
                            actor: {
                                uri: 'https://api.calendly.com/users/SDLKJENFJKD123',
                                type: 'User',
                                organization: {
                                    uri: 'https://api.calendly.com/organizations/LKJENFLKE293847',
                                    role: 'Owner'
                                },
                                group: {
                                    uri: 'https://api.calendly.com/groups/123987DJLKJEF',
                                    name: 'Development',
                                    role: 'Admin'
                                },

                                display_name: 'Test User',
                                alternative_identifier: 'testuser@example.com'
                            },

                            fully_qualified_name: 'User.Add',
                            details: {},
                            organization:
                                'https://api.calendly.com/organizations/AAAAAAAAAAAAAAA'
                        }
                    ],
                    pagination: {
                        count: 1,
                        next_page:
                            'https://api.calendly.com/activity_log?page_token=sNjq4TvMDfUHEl7zHRR0k0E1PCEJWvdi',

                        next_page_token: 'sNjq4TvMDfUHEl7zHRR0k0E1PCEJWvdi',
                        previous_page:
                            'https://api.calendly.com/activity_log?page_token=dGhpcyBpcyBvbmx5IGFuIGV4YW1wbGUgc3RyaW5n',
                        previous_page_token:
                            'dGhpcyBpcyBvbmx5IGFuIGV4YW1wbGUgc3RyaW5n'
                    },
                    last_event_time: '2020-01-02T03:04:05.678Z',
                    total_count: 1,
                    exceeds_max_total_count: false
                })
        })
    ) as jest.Mock
);

jest.spyOn(Calendly.prototype, 'getOrganizationUri').mockImplementation(
    jest.fn(() =>
        Promise.resolve(
            'https://api.calendly.com/organizations/AAAAAAAAAAAAAAA'
        )
    ) as jest.Mock
);

beforeEach(() => {
    calendly = new Calendly(CALENDLY_ACCESS_TOKEN);
    jest.clearAllMocks();
});

test('ActivityLog is instantiable', () => {
    const activityLog: ActivityLog = calendly.activityLog;
    expect(activityLog).toBeInstanceOf(ActivityLog);
});

test('ActivityLog can get the activity log', async () => {
    const activityLog: ActivityLog = calendly.activityLog;
    const uri =
        'https://api.calendly.com/activity_log_entries?organization=https://api.calendly.com/organizations/AAAAAAAAAAAAAAA&count=10&page_token=123456789&sort=asc';
    await activityLog.listActivityLogEntries({
        count: 10,
        sort: 'asc',
        page_token: '123456789'
    });
    expect(global.fetch).toHaveBeenCalledTimes(1); // first call gets organization, second call gets activity log
    expect(global.fetch).toHaveBeenCalledWith(uri, {
        headers: {
            Authorization: `Bearer ${CALENDLY_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        method: 'GET'
    });
});
