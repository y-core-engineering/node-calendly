/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : CalendlyCancellation.ts
 *******************************************/

export type Cancellation = {
    canceled_by: string;
    reason: string;
    canceler_type: 'invitee' | 'host';
};
