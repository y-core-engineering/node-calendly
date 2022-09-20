/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : CalendlyCancellation.ts
 *******************************************/

/**
 * Provides data pertaining to the cancellation of the Event
 * @export
 * @interface CalendlyCancellation
 * @see https://developer.calendly.com/api-docs/77497aba237ee-cancellation
 */
export type Cancellation = {
    canceled_by: string;
    reason: string;
    canceler_type: 'invitee' | 'host';
};
