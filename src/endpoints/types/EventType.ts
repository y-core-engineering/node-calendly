/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : EventType.ts
 *******************************************/

type EventTypeDefinition = {
    uri: string;
    name: string | null;
    active: boolean;
    slug: string | null;
    scheduling_url: string;
    duration: number;
    kind: 'solo' | 'group';
    pooling_type: 'round_robin' | 'collective' | null;
    type: 'StandardEventType' | 'AdhocEventType';
    color: string;
    created_at: Date;
    updated_at: Date;
    internal_notes: string | null;
    description_plain: string | null;
    description_html: string | null;
    profile: {
        type: 'User' | 'Team';
        name: string;
        owner: string;
    };
    secret: boolean;
    booking_method: 'instant' | 'poll';
    custom_questions:
        | null
        | {
              name: string;
              type:
                  | 'string'
                  | 'text'
                  | ' phone_number'
                  | 'single_select'
                  | 'multi_select';
              position: number;
              enabled: boolean;
              required: boolean;
              answer_choices: string[];
              include_other: boolean;
          }[];
    deleted_at: null | Date;
};

/**
 * A configuration for an Event. Provides two methods:
 * - fromJson: Creates an event type object from a json object.
 * - getUUID: Returns the uuid of the event type.
 * @export default
 * @interface EventType
 * @implements {EventTypeDefinition}
 * @see https://developer.calendly.com/api-docs/f3185c91567db-event-type
 */
export default class EventType implements EventTypeDefinition {
    uri: string;
    name: string | null;
    active: boolean;
    slug: string | null;
    /* tslint:disable-next-line */
    scheduling_url: string;
    duration: number;
    kind: 'solo' | 'group';
    /* tslint:disable-next-line */
    pooling_type: 'round_robin' | 'collective' | null;
    type: 'StandardEventType' | 'AdhocEventType';
    color: string;
    /* tslint:disable-next-line */
    created_at: Date;
    /* tslint:disable-next-line */
    updated_at: Date;
    /* tslint:disable-next-line */
    internal_notes: string | null;
    /* tslint:disable-next-line */
    description_plain: string | null;
    /* tslint:disable-next-line */
    description_html: string | null;
    profile: {
        type: 'User' | 'Team';
        name: string;
        owner: string;
    };
    secret: boolean;
    /* tslint:disable-next-line */
    booking_method: 'instant' | 'poll';
    /* tslint:disable-next-line */
    custom_questions:
        | null
        | {
              name: string;
              type:
                  | 'string'
                  | 'text'
                  | ' phone_number'
                  | 'single_select'
                  | 'multi_select';
              position: number;
              enabled: boolean;
              required: boolean;
              /* tslint:disable-next-line */
              answer_choices: string[];
              /* tslint:disable-next-line */
              include_other: boolean;
          }[];
    /* tslint:disable-next-line */
    deleted_at: null | Date;

    private constructor(data: EventTypeDefinition) {
        this.uri = data.uri;
        this.name = data.name;
        this.active = data.active;
        this.slug = data.slug;
        this.scheduling_url = data.scheduling_url;
        this.duration = data.duration;
        this.kind = data.kind;
        this.pooling_type = data.pooling_type;
        this.type = data.type;
        this.color = data.color;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.internal_notes = data.internal_notes;
        this.description_plain = data.description_plain;
        this.description_html = data.description_html;
        this.profile = data.profile;
        this.secret = data.secret;
        this.booking_method = data.booking_method;
        this.custom_questions = data.custom_questions;
        this.deleted_at = data.deleted_at;
    }

    static fromJson(data: EventTypeDefinition): EventType {
        return new EventType(data);
    }

    public getUuid(): string {
        return this.uri.split('/').pop() || '';
    }
}
