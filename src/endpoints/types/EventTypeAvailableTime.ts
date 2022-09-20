/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : EventTypeAvailableTime.ts
 *******************************************/

/**
 * An available meeting time slot for the given event type.
 * @export
 * @interface EventTypeAvailableTime
 * @see https://developer.calendly.com/api-docs/2d8d322931358-event-type-available-time
 */
export type EventTypeAvailableTime = {
    status: string;
    invitees_remaining: number;
    start_time: Date;
    scheduling_url: string;
};
