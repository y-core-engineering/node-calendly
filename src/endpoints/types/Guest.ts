/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : Guest.ts
 *******************************************/

/**
 * An individual whom an invitee has invited to be a guest attendee to an event.
 * @export
 * @interface Guest
 * @see https://developer.calendly.com/api-docs/7307270523502-guest
 */
export type Guest = {
    email: string;
    created_at: Date;
    updated_at: Date;
};
