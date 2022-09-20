/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Tue Sep 20 2022
 *  File : EventTypes.test.ts
 *******************************************/
import { config } from 'dotenv';
import Calendly from '../Calendly';
import EventTypes from '../endpoints/EventTypes';
config();

const CALENDLY_ACCESS_TOKEN = process.env.CALENDLY_ACCESS_TOKEN || '';

let calendly: Calendly;

jest.spyOn(global, 'fetch').mockImplementation(
    jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    resource: {
                        uri: 'https://api.calendly.com/event_types/AAAAAAAAAAAAAAAA',

                        name: '15 Minute Meeting',

                        active: true,

                        booking_method: 'instant',

                        slug: 'acmesales',

                        scheduling_url: 'https://calendly.com/acmesales',

                        duration: 30,

                        kind: 'solo',

                        pooling_type: 'round_robin',

                        type: 'StandardEventType',

                        color: '#fff200',

                        created_at: '2019-01-02T03:04:05.678123Z',

                        updated_at: '2019-08-07T06:05:04.321123Z',

                        internal_note: 'Internal note',

                        description_plain: '15 Minute Meeting',

                        description_html: '<p>15 Minute Meeting</p>',

                        profile: {
                            type: 'User',

                            name: 'Tamara Jones',

                            owner: 'https://api.calendly.com/users/AAAAAAAAAAAAAAAA'
                        },

                        secret: true,

                        deleted_at: null,

                        custom_questions: [
                            {
                                name: 'Company Name',

                                type: 'string',

                                position: 0,

                                enabled: true,

                                required: true,

                                answer_choices: [],

                                include_other: false
                            },

                            {
                                name: 'What would you like to discuss?',

                                type: 'text',

                                position: 0,

                                enabled: true,

                                required: true,

                                answer_choices: [],

                                include_other: false
                            },

                            {
                                name: 'Number of employees',

                                answer_choices: ['1', '2-10', '11-20', '20+'],

                                enabled: true,

                                include_other: true,

                                position: 2,

                                required: false,

                                type: 'single_select'
                            },

                            {
                                name: 'Multi-Select Question',

                                answer_choices: [
                                    'Answer 1',

                                    'Answer 2',

                                    'Answer 3',

                                    'Answer 4'
                                ],

                                enabled: true,

                                include_other: true,

                                position: 2,

                                required: false,

                                type: 'multi_select'
                            },

                            {
                                name: 'Phone Number',

                                type: 'phone_number',

                                position: 0,

                                enabled: true,

                                required: true,

                                answer_choices: [],

                                include_other: false
                            }
                        ]
                    }
                })
        })
    ) as jest.Mock
);

beforeEach(() => {
    calendly = new Calendly(CALENDLY_ACCESS_TOKEN);
    jest.clearAllMocks();
});

test('EventTypes is instantiable', () => {
    const eventTypes: EventTypes = calendly.eventTypes;
    expect(eventTypes).toBeInstanceOf(EventTypes);
});

test('EventTypes getEventType', async () => {
    const eventTypes: EventTypes = calendly.eventTypes;
    const result = await eventTypes.getEventType({ uuid: 'AAAAAAAAAAAAAAAA' });
    expect(result).toBeDefined();
    expect(result.uri).toBe(
        'https://api.calendly.com/event_types/AAAAAAAAAAAAAAAA'
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
        `https://api.calendly.com/event_types/AAAAAAAAAAAAAAAA`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${CALENDLY_ACCESS_TOKEN}`
            }
        }
    );
});
