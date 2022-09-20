/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : ScheduledEvents.ts
 *******************************************/

import CalendlyApiEndpoint from '../CalendlyApiEndpoint';
import { ErrorResponse } from '../types/ErrorResponse';
import { EventType } from '../types/Event';
import { Invitee } from '../types/Invitee';
import { PaginationResponse } from '../types/PaginationResponse';

export default class ScheduledEvents extends CalendlyApiEndpoint {
    public async listEvents(
        params: ListEventsRequestParams
    ): Promise<PaginationResponse<EventType>> {
        const queryParams = this.getEventsQueryParams(params);
        const url = `https://api.calendly.com/scheduled_events?${queryParams}`;
        return await this.fetchGet(url);
    }

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

type ListEventInviteesRequestParams = {
    count?: number;
    email?: string;
    page_token?: string;
    sort?: 'asc' | 'desc';
    status?: 'active' | 'canceled';
};

type ListEventsRequestParams = {
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
