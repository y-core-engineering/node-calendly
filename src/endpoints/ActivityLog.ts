/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : ActivityLog.ts
 *******************************************/

import CalendlyApiEndpointWithOrganization from './CalendlyApiEndpointWithOrganization';
import { ErrorResponse } from './ErrorResponse';
import { PaginationResponse } from './PaginationResponse';

/**
 * The activity log endpoint.
 * @export default
 * @class ActivityLog
 * @extends {CalendlyApiEndpointWithOrganization}
 * @see https://developer.calendly.com/api-docs/d37c7f031f339-list-activity-log-entries
 */
export default class ActivityLog extends CalendlyApiEndpointWithOrganization {
    /**
     * Returns a list of activity log entries
     * @param params The query parameters.
     * @returns {Promise<ActivityLogResponse>} It is either a list of activity log entries as a paginated response or an error.
     * @see https://developer.calendly.com/api-docs/d37c7f031f339-list-activity-log-entries
     * @memberof ActivityLog
     * @example const activitiesResponse = Calendly.activityLog.listActivityLogEntries({count: 10});
     * @see ActivityLogQueryParams
     * @see ActivityLogResponse
     */
    public async listActivityLogEntries(
        params: ActivityLogQueryParams
    ): Promise<ActivityLogResponse> {
        const query: ActivityLogQuery = new ActivityLogQuery(
            params,
            await this.organizationProvider.getOrganizationUri()
        );
        const queryParams = query.getQueryParams();

        const url = `https://api.calendly.com/activity_log_entries?${queryParams}`;
        return await this.fetchGet(url);
    }
}

/**
 * The definition of an Activity Log query
 * @export
 * @interface ActivityLogQueryParams
 * @see https://developer.calendly.com/api-docs/d37c7f031f339-list-activity-log-entries
 */
export type ActivityLogQueryParams = {
    action?: [string];
    count?: number;
    max_occurred_at?: Date;
    min_occurred_at?: Date;
    namespace?: [string];
    page_token?: string;
    search_term?: string;
    sort?: [string];
};

/**
 * The definition of an Activity Log response.
 * @export
 * @interface ActivityLogResponse
 * @see https://developer.calendly.com/api-docs/d37c7f031f339-list-activity-log-entries
 */
export type ActivityLogResponse =
    | ErrorResponse
    | (PaginationResponse<ActivityLogEntry> & {
          last_event_time: Date | null;
          total_count: number;
          exceeds_max_total_count: boolean;
      });

export type ActivityLogEntry = {
    occurred_at: Date;
    actor?: {
        uri: string;
        type?: string;
        organization?: {
            uri: string;
            role: string;
        };
        group?: {
            uri: string;
            name: string;
            role: string;
        };
        display_name?: string;
        alternative_identifier?: string;
    };
    details: {};
    fully_qualified_name: string;
    uri: string;
    namespace: string;
    action: string;
    organization: string;
};

/**
 * The definition of an Activity Log entry.
 * @export
 * @class ActivityLogQuery
 * @see https://developer.calendly.com/api-docs/d37c7f031f339-list-activity-log-entries
 */
export class ActivityLogQuery implements ActivityLogQueryParams {
    organization: string;
    action?: [string];
    count: number;
    /* tslint:disable-next-line */
    max_occurred_at?: Date;
    /* tslint:disable-next-line */
    min_occurred_at?: Date;
    /* tslint:disable-next-line */
    namespace?: [string];
    /* tslint:disable-next-line */
    page_token?: string;
    /* tslint:disable-next-line */
    search_term?: string;
    sort?: [string];

    constructor(data: ActivityLogQueryParams, organization: string) {
        this.organization = organization;
        this.action = data.action;
        this.count = data.count ? data.count : 20;
        this.max_occurred_at = data.max_occurred_at;
        this.min_occurred_at = data.min_occurred_at;
        this.namespace = data.namespace;
        this.page_token = data.page_token;
        this.search_term = data.search_term;
        this.sort = data.sort;
    }

    /**
     * Returns the query parameters as a string.
     * @returns {string} The query string for the request.
     */
    public getQueryParams(): string {
        const queryParams: string[] = [];
        queryParams.push(`organization=${this.organization}`);
        if (this.action) {
            queryParams.push(`action=${this.action.join(',')}`);
        }
        if (this.count) {
            queryParams.push(`count=${this.count}`);
        }
        if (this.max_occurred_at) {
            queryParams.push(
                `max_occurred_at=${this.max_occurred_at.toISOString()}`
            );
        }
        if (this.min_occurred_at) {
            queryParams.push(
                `min_occurred_at=${this.min_occurred_at.toISOString()}`
            );
        }
        if (this.namespace) {
            queryParams.push(`namespace=${this.namespace.join(',')}`);
        }
        if (this.page_token) {
            queryParams.push(`page_token=${this.page_token}`);
        }
        if (this.search_term) {
            queryParams.push(`search_term=${this.search_term}`);
        }
        if (this.sort) {
            queryParams.push(`sort=${this.sort.join(',')}`);
        }
        return queryParams.join('&');
    }
}
