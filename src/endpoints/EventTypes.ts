/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : EventTypes.ts
 *******************************************/
import CalendlyApiWithOrganization from '../CalendlyApiWithOrganization';
import { MeProvider, OrganizationProvider } from '../Provider';
import {
    default as EventType,
    EventTypeOrganisationRequest,
    EventTypeUserRequest
} from '../types/EventType';
import {
    EventTypeAvailableTimeRequest,
    EventTypeAvailableTimeResponse
} from '../types/EventTypeAvailableTime';
import { PaginationResponse } from '../types/PaginationResponse';

export default class EventTypes extends CalendlyApiWithOrganization {
    meProvider: MeProvider;
    constructor(
        ACCESS_TOKEN: string,
        organizationProvider: OrganizationProvider,
        meProvider: MeProvider
    ) {
        super(ACCESS_TOKEN, organizationProvider);
        this.meProvider = meProvider;
    }

    public async listUsersEventTypes(
        params: EventTypeUserRequest
    ): Promise<PaginationResponse<EventType>> {
        if (!params.user) {
            params.user = await this.meProvider.getMe(); // request default me
        }
        return await this.listEventTypes(params);
    }

    public async listOrganisationEventTypes(
        params: EventTypeOrganisationRequest
    ): Promise<PaginationResponse<EventType>> {
        if (!params.organization) {
            params.organization =
                await this.organizationProvider.getOrganizationUri(); // request default organization
        }
        return await this.listEventTypes(params);
    }

    public async getEventType({ uuid }: { uuid: string }): Promise<EventType> {
        const url = `https://api.calendly.com/event_types/${uuid}`;
        const response = await this.fetchGet(url);
        return EventType.fromJson(response.resource);
    }

    // TODO: has errors
    public async listEventAvailableTimes(
        params: EventTypeAvailableTimeRequest
    ): Promise<EventTypeAvailableTimeResponse> {
        const queryParams = this.getEventTypeAvailableTimeRequestParams(params);
        const url = `https://api.calendly.com/event_type_available_times?${queryParams}`;
        console.log(url);
        throw new Error('Has errors');
        // return await this.fetchGet(url);
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
