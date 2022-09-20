/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : ActivityLog.ts
 *******************************************/

import CalendlyApiWithOrganization from '../CalendlyApiWithOrganization';
import {
    ActivityLogQuery,
    ActivityLogQueryParams,
    ActivityLogResponse
} from '../types/ActivityLog';

export default class ActivityLog extends CalendlyApiWithOrganization {
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