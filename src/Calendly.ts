/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : CalendlyGateway.ts
 *******************************************/

import ActivityLog from './endpoints/ActivityLog';
import DataCompliance from './endpoints/DataCompliance';
import EventTypes from './endpoints/EventTypes';
import { MeProvider, OrganizationProvider } from './endpoints/Provider';
import ScheduledEvents from './endpoints/ScheduledEvents';
import Users from './endpoints/Users';

export default class Calendly implements OrganizationProvider, MeProvider {
    /**
     * The access token to use for the API calls.
     * @type {string}
     * @memberof Calendly
     * @private
     * @readonly
     * @see https://developer.calendly.com/when-to-choose-between-personal-access-tokens-and-oauth
     */
    private ACCESS_TOKEN: string;

    /**
     * The users endpoint.
     * @type {Users}
     * @memberof Calendly
     * @see https://developer.calendly.com/api-docs/ff9832c5a6640-get-user
     */
    users: Users;
    /**
     * The activity log endpoint.
     * @type {ActivityLog}
     * @memberof Calendly
     * @see https://developer.calendly.com/api-docs/d37c7f031f339-list-activity-log-entries
     */
    activityLog: ActivityLog;
    /**
     * The data compliance endpoint.
     * @type {DataCompliance}
     * @memberof Calendly
     * @see https://developer.calendly.com/api-docs/4cf896120a018-delete-invitee-data
     */
    dataCompliance: DataCompliance;
    /**
     * The event types endpoint.
     * @type {EventTypes}
     * @memberof Calendly
     * @see https://developer.calendly.com/api-docs/25a4ece03c1bc-list-user-s-event-types
     */
    eventTypes: EventTypes;
    /**
     * The scheduled events endpoint.
     * @type {ScheduledEvents}
     * @memberof Calendly
     * @see https://developer.calendly.com/api-docs/eb8ee72701f99-list-event-invitees
     */
    scheduledEvents: ScheduledEvents;

    /**
     * Creates an instance of Calendly. After creation you can use the endpoints to access the API.
     * @param ACCESS_TOKEN The access token to use for the API calls.
     * @memberof Calendly
     */
    constructor(ACCESS_TOKEN: string) {
        this.ACCESS_TOKEN = ACCESS_TOKEN;
        this.users = new Users(this.ACCESS_TOKEN);
        this.activityLog = new ActivityLog(this.ACCESS_TOKEN, this);
        this.dataCompliance = new DataCompliance(this.ACCESS_TOKEN);
        this.eventTypes = new EventTypes(this.ACCESS_TOKEN, this, this);
        this.scheduledEvents = new ScheduledEvents(this.ACCESS_TOKEN);
    }

    /**
     * Get the current user.
     * @returns {Promise<string>} The URI of the current user.
     */
    async getMe(): Promise<string> {
        const user = await this.users.getCurrentUser();
        return user.uri;
    }
    /**
     * Get the organization of the current user.
     * @returns {Promise<string>} The URI of the current organization.
     */
    async getOrganizationUri(): Promise<string> {
        const user = await this.users.getCurrentUser();
        return user.current_organization;
    }

    /**
     * Get the uuid from a URI.
     * @param resourceUri The URI of the resource.
     * @returns  The UUID of the resource.
     */
    public static getUuidFromUri(resourceUri: string): string | undefined {
        return resourceUri.split('/').pop();
    }
}
