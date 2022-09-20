/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : ScheduledEvents.ts
 *******************************************/

import { ErrorResponse } from './ErrorResponse';
import { EventDefinition } from './types/Event';

import CalendlyApiEndpoint from './CalendlyApiEndpoint';
import { PaginationResponse } from './PaginationResponse';
import { Invitee } from './types/Invitee';

/**
 * The scheduled events endpoint.
 * @export default
 * @class ScheduledEvents
 * @extends {CalendlyApiEndpoint}
 * @see https://developer.calendly.com/api-docs/eb8ee72701f99-list-event-invitees
 */
export default class ScheduledEvents extends CalendlyApiEndpoint {
    /**
     * Returns a list of Events.
     * - Pass organization parameter to return events for that organization (requires admin/owner privilege)
     * - Pass user parameter to return events for a specific User
     *
     * NOTES:
     *
     * - If you are the admin/owner of the organization, you can use both organization and user to get a list of events for a specific user within your organization.
     * - user can only be used alone when requesting your own personal events. This will return your events within any organization that you are currently in or were a part of in the past.
     * @param params The request parameters.
     * @returns {Promise<PaginationResponse<EventDefinition> & ErrorResponse>}
     * @memberof ScheduledEvents
     * @see https://developer.calendly.com/api-docs/2d5ed9bbd2952-list-events
     */
    public async listEvents(
        params: ListEventsRequestParams
    ): Promise<PaginationResponse<EventDefinition>> {
        const queryParams = this.getEventsQueryParams(params);
        const url = `https://api.calendly.com/scheduled_events?${queryParams}`;
        return await this.fetchGet(url);
    }

    /**
     * Returns a list of Invitees for an event.
     * @param uuid The event uuid.
     * @param params The request parameters.
     * @returns {Promise<PaginationResponse<Invitee> & ErrorResponse>}
     * @memberof ScheduledEvents
     * @see https://developer.calendly.com/api-docs/eb8ee72701f99-list-event-invitees
     */
    public async listEventInvitees(
        uuid: string,
        params: ListEventInviteesRequestParams
    ): Promise<PaginationResponse<Invitee> & ErrorResponse> {
        const queryParams = this.getEventInviteesQueryParams(params);
        const url = `https://api.calendly.com/scheduled_events/${uuid}/invitees?${queryParams}`;
        return await this.fetchGet(url);
    }

    private getEventsQueryParams(params: ListEventsRequestParams) {
        const queryParams: string[] = [];
        if (params.count) {
            queryParams.push(`count=${params.count}`);
        }
        if (params.invitee_email) {
            queryParams.push(`invitee_email=${params.invitee_email}`);
        }
        if (params.max_start_time) {
            queryParams.push(
                `max_start_time=${params.max_start_time.toISOString}`
            );
        }
        if (params.min_start_time) {
            queryParams.push(
                `min_start_time=${params.min_start_time.toISOString}`
            );
        }
        if (params.organization) {
            queryParams.push(`organization=${params.organization}`);
        }
        if (params.page_token) {
            queryParams.push(`page_token=${params.page_token}`);
        }
        if (params.sort) {
            queryParams.push(`sort=${params.sort}`);
        }
        if (params.status) {
            queryParams.push(`status=${params.status}`);
        }
        if (params.user) {
            queryParams.push(`user=${params.user}`);
        }
        return queryParams.join('&');
    }

    private getEventInviteesQueryParams(
        params: ListEventInviteesRequestParams
    ) {
        const queryParams: string[] = [];
        if (params.count) {
            queryParams.push(`count=${params.count}`);
        }
        if (params.email) {
            queryParams.push(`email=${params.email}`);
        }
        if (params.page_token) {
            queryParams.push(`page_token=${params.page_token}`);
        }
        if (params.status) {
            queryParams.push(`status=${params.status}`);
        }
        return queryParams.join('&');
    }
}

export type ListEventInviteesRequestParams = {
    count?: number;
    email?: string;
    page_token?: string;
    sort?: 'asc' | 'desc';
    status?: 'active' | 'canceled';
};

export type ListEventsRequestParams = {
    count?: number;
    invitee_email?: string;
    max_start_time?: Date;
    min_start_time?: Date;
    organization?: string;
    page_token?: string;
    sort?: 'asc' | 'desc';
    status?: 'active' | 'canceled';
    user?: string;
};
