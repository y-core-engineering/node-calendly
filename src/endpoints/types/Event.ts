/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : Event.ts
 *******************************************/
import { Cancellation } from './Cancellation';

export type EventDefinition = {
    uri: string;
    name: string;
    status: 'active' | 'canceled';
    start_time: Date;
    end_time: Date;
    event_type: string;
    location:
        | PhysicalLocation
        | OutboundCallLocation
        | InboundCallLocation
        | GoogleConferenceLocation
        | ZoomConferenceLocation
        | GoToMeetingLocation
        | MicrosoftTeamsConferenceLocation
        | WebexConferenceLocation
        | CustomLocation
        | AskInviteeLocation;
    invitees_counter: {
        total: number;
        active: number;
        limit: number;
    };
    created_at: Date;
    updated_at: Date;
    event_memberships: [
        {
            user: string;
        },
    ];
    event_guests: [
        {
            email: string;
            created_at: Date;
            updated_at: Date;
        },
    ];
    cancellation?: Cancellation;
};
/**
 * Information about a scheduled meeting. Provides one more method:
 * - fromJson: Creates an event object from a json object.
 * @export default
 * @interface CalendlyEvent
 * @implements {EventType}
 * @see https://developer.calendly.com/api-docs/504508461e486-event
 */
export default class CalendlyEvent implements EventDefinition {
    uri: string;
    name: string;
    status: 'active' | 'canceled';
    /* tslint:disable-next-line */
    start_time: Date;
    /* tslint:disable-next-line */
    end_time: Date;
    /* tslint:disable-next-line */
    event_type: string;
    location:
        | PhysicalLocation
        | OutboundCallLocation
        | InboundCallLocation
        | GoogleConferenceLocation
        | ZoomConferenceLocation
        | GoToMeetingLocation
        | MicrosoftTeamsConferenceLocation
        | WebexConferenceLocation
        | CustomLocation
        | AskInviteeLocation;
    /* tslint:disable-next-line */
    invitees_counter: {
        total: number;
        active: number;
        limit: number;
    };
    /* tslint:disable-next-line */
    created_at: Date;
    /* tslint:disable-next-line */
    updated_at: Date;
    /* tslint:disable-next-line */
    event_memberships: [
        {
            user: string;
        },
    ];
    /* tslint:disable-next-line */
    event_guests: [
        {
            email: string;
            created_at: Date;
            updated_at: Date;
        },
    ];
    cancellation?: Cancellation;
    uuid: string | undefined;

    private constructor(event: EventDefinition) {
        this.uri = event.uri;
        this.name = event.name;
        this.status = event.status;
        this.start_time = new Date(event.start_time);
        this.end_time = new Date(event.end_time);
        this.event_type = event.event_type;
        this.location = event.location;
        this.invitees_counter = event.invitees_counter;
        this.created_at = new Date(event.created_at);
        this.updated_at = new Date(event.updated_at);
        this.event_memberships = event.event_memberships;
        this.event_guests = event.event_guests;
        this.cancellation = event.cancellation;
        this.uuid = this.uri.split('/').pop();
    }

    public static fromJSON(event: EventDefinition): CalendlyEvent {
        return new CalendlyEvent(event);
    }
}

export type PhysicalLocation = {
    type: 'physical';
    location: string;
};

export type OutboundCallLocation = {
    type: 'outbound_call';
    location: string;
};

export type InboundCallLocation = {
    type: 'inbound_call';
    location: string;
};

export type GoogleConferenceLocation = WebConferenceLocation & {
    type: 'google_conference';
};

export type ZoomConferenceLocation = WebConferenceLocation & {
    type: 'zoom_conference';
    data: {
        id: string;
        password: string;
        settings: {
            global_dial_in_numbers: [global_dial_in_number];
        };
        extra: {
            intl_numbers_url: string;
        };
    };
};

export type GoToMeetingLocation = WebConferenceLocation & {
    type: 'gotomeeting';
    data: {
        uniqueMeetingId: string;
        conferenceCallInfo: string;
    };
};

export type MicrosoftTeamsConferenceLocation = WebConferenceLocation & {
    type: 'microsoft_teams_conference';
    data: {
        id: string;
        audioConferencing: {
            conferenceId: string;
            dialinUrl: string;
            tollNumber: string;
        };
    };
};

export type WebexConferenceLocation = WebConferenceLocation & {
    type: 'webex_conference';
    data: {
        id: string;
        password: string;
        telephony: {
            callInNumbers: [callInNumber];
        };
    };
};

export type CustomLocation = {
    type: 'custom';
    location: string;
};

export type AskInviteeLocation = {
    type: 'ask_invitee';
    location: string;
};

export type WebConferenceLocation = {
    status: 'initiated' | 'processing' | 'pushed' | 'failed';
    join_url: string;
};

export type global_dial_in_number = {
    number: string;
    country: string;
    type: string;
    city: string;
    country_name: string;
};

export type callInNumber = {
    label: string;
    callInNumber: string;
    tollType: string;
};
