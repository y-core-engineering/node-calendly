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
                    collection: [
                        {
                            status: 'available',

                            invitees_remaining: 2,

                            start_time: '2020-01-02T20:00:00.000000Z',

                            scheduling_url:
                                'https://calendly.com/acmesales/discovery-call/2020-01-02T20:00:00Z?month=2020-01&date=2020-01-02'
                        },

                        {
                            status: 'available',

                            invitees_remaining: 1,

                            start_time: '2020-01-03T15:00:00.000000Z',

                            scheduling_url:
                                'https://calendly.com/acmesales/discovery-call/2020-01-03T15:00:00Z?month=2020-01&date=2020-01-03'
                        },

                        {
                            status: 'available',

                            invitees_remaining: 3,

                            start_time: '2020-01-07T23:00:00.000000Z',

                            scheduling_url:
                                'https://calendly.com/acmesales/discovery-call/2020-01-07T23:00:00Z?month=2020-01&date=2020-01-07'
                        }
                    ]
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

test('EventType listEventAvailableTimes', async () => {
    const eventTypes: EventTypes = calendly.eventTypes;
    const result = await eventTypes.listEventAvailableTimes({
        event_type: 'test'
    });
    expect(result.collection.length).toBe(3);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
        'https://api.calendly.com/event_type_available_times?event_type=test',
        {
            headers: {
                Authorization: `Bearer ${CALENDLY_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }
    );
});
