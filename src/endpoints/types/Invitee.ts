/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : Invitee.ts
 *******************************************/

import { Cancellation } from './Cancellation';

/**
 * An individual who has been invited to meet with a Calendly member.
 * @export
 * @interface Invitee
 * @see https://developer.calendly.com/api-docs/decca36cf717f-invitee
 */
export type Invitee = {
    uri: string;
    email: string;
    first_name: string;
    last_name: string;
    name: string;
    status: 'active' | 'canceled';
    questions_and_answers: [
        {
            question: string;
            answer: string;
            position: number;
        },
    ];
    timezone: string;
    event: string;
    created_at: Date;
    updated_at: Date;
    tracking: {
        utm_source: string;
        utm_medium: string;
        utm_campaign: string;
        utm_content: string;
        utm_term: string;
        salesforce_uuid: string;
    };
    text_reminder_number: string | null;
    rescheduled: boolean;
    routing_form_submission: string | null;
    cancellation?: Cancellation;
    payment: null | {
        external_id: string;
        provider: string;
        amount: number;
        currency: string;
        terms: string | null;
        successful: boolean;
    };
    no_show: null | {
        uri: string;
        created_at: Date;
    };
    reconfirmation: null | {
        created_at: Date;
        confirmed_at: Date;
    };
};
