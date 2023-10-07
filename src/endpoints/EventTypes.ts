/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : EventTypes.ts
 *******************************************/

import { Options } from './CalendlyApiEndpoint';
import CalendlyApiEndpointWithOrganization from './CalendlyApiEndpointWithOrganization';
import { PaginationResponse } from './PaginationResponse';
import { MeProvider, OrganizationProvider } from './Provider';
import EventType from './types/EventType';
import { EventTypeAvailableTime } from './types/EventTypeAvailableTime';

/**
 * The event types endpoint.
 * @export default
 * @class EventTypes
 * @extends {CalendlyApiEndpointWithOrganization}
 * @see https://developer.calendly.com/api-docs/25a4ece03c1bc-list-user-s-event-types
 */
export default class EventTypes extends CalendlyApiEndpointWithOrganization {
    meProvider: MeProvider;
    constructor(
        ACCESS_TOKEN: string,
        organizationProvider: OrganizationProvider,
        meProvider: MeProvider,
        params?: Options
    ) {
        super(ACCESS_TOKEN, organizationProvider, params);
        this.meProvider = meProvider;
    }

    /**
     * Returns all Event Types associated with a specified User. If user is not specified, the current user is used.
     * @param params
     * @returns {Promise<PaginationResponse<EventType>>} A paginated list of Event Types.
     */
    public async listUsersEventTypes(
        params: EventTypeUserRequest
    ): Promise<PaginationResponse<EventType>> {
        if (!params.user) {
            params.user = await this.meProvider.getMe(); // request default me
        }
        return await this.listEventTypes(params);
    }

    /**
     * Returns all Event Types associated with a specified Organization. If organization is not specified, the current organization is used.
     * @param params The request parameters.
     * @returns {Promise<PaginationResponse<EventType>>} A paginated list of Event Types.
     */
    public async listOrganisationEventTypes(
        params: EventTypeOrganisationRequest
    ): Promise<PaginationResponse<EventType>> {
        if (!params.organization) {
            params.organization =
                await this.organizationProvider.getOrganizationUri(); // request default organization
        }
        return await this.listEventTypes(params);
    }

    /**
     * Returns information about a specified Event Type.
     * @param param The uuid of the event type.
     * @returns {Promise<EventType>} The event type.
     */
    public async getEventType({ uuid }: { uuid: string }): Promise<EventType> {
        const url = `https://api.calendly.com/event_types/${uuid}`;
        const response = await this.fetchGet(url);
        return EventType.fromJson(response.resource);
    }

    // TODO: has errors
    /**
     * Returns a list of available times for an event type within a specified date range.
     * Date range can be no greater than 1 week (7 days).
     *
     * NOTE:
     *
     * This endpoint does not support traditional keyset pagination.
     * @param params The request parameters.
     * @returns {Promise<EventTypeAvailableTimeResponse>} The available times.
     * @note This endpoint does not support traditional keyset pagination.
     * @todo has errors
     */
    public async listEventAvailableTimes(
        params: EventTypeAvailableTimeRequest
    ): Promise<EventTypeAvailableTimeResponse> {
        const queryParams = this.getEventTypeAvailableTimeRequestParams(params);
        const url = `https://api.calendly.com/event_type_available_times?${queryParams}`;
        return await this.fetchGet(url);
    }

    private async listEventTypes(
        params: EventTypeUserRequest & EventTypeOrganisationRequest
    ) {
        const queryParams = this.getListEventTypesRequestParams(params);
        const url = `https://api.calendly.com/event_types?${queryParams}`;
        return await this.fetchGet(url);
    }

    private getListEventTypesRequestParams(
        params: EventTypeUserRequest & EventTypeOrganisationRequest
    ): string {
        const queryParams: string[] = [];
        if (params.organization) {
            queryParams.push(`organization=${params.organization}`);
        }
        if (params.user) {
            queryParams.push(`user=${params.user}`);
        }
        if (params.active) {
            queryParams.push(`active=${params.active}`);
        }
        if (params.count) {
            queryParams.push(`count=${params.count}`);
        }
        if (params.page_token) {
            queryParams.push(`page_token=${params.page_token}`);
        }
        if (params.sort) {
            queryParams.push(`sort=${params.sort}`);
        }
        return queryParams.join('&');
    }

    private getEventTypeAvailableTimeRequestParams(
        params: EventTypeAvailableTimeRequest
    ) {
        const queryParams: string[] = [];
        if (params.end_time) {
            queryParams.push(`end_time=${params.end_time.toISOString()}`);
        }
        if (params.start_time) {
            queryParams.push(`start_time=${params.start_time.toISOString()}`);
        }
        if (params.event_type) {
            queryParams.push(`event_type=${params.event_type}`);
        }
        return queryParams.join('&');
    }
}

export type EventTypeUserRequest = EventTypeRequest & {
    user?: string;
};

export type EventTypeOrganisationRequest = EventTypeRequest & {
    organization?: string;
};

export type EventTypeRequest = {
    active?: boolean;
    count?: number;
    page_token?: string;
    sort?: string;
};

export type EventTypeAvailableTimeRequest = {
    end_time?: Date;
    start_time?: Date;
    event_type: string;
};

export type EventTypeAvailableTimeResponse = {
    collection: EventTypeAvailableTime[];
};
