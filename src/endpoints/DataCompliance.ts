/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : DataCompliance.ts
 *******************************************/

import CalendlyApiEndpoint from './CalendlyApiEndpoint';
import { ErrorResponse } from './ErrorResponse';

/**
 * The data compliance endpoint.
 * @export default
 * @class DataCompliance
 * @extends {CalendlyApiEndpoint}
 * @see https://developer.calendly.com/api-docs/4cf896120a018-delete-invitee-data
 */
export default class DataCompliance extends CalendlyApiEndpoint {
    /**
     * To submit a request to remove invitee data from all previously booked events in your
     * organization, use this endpoint. Requests for data deletion can take up to 7 days to complete.
     * @param emails The emails of the invitees to delete.
     * @returns {Promise<DataComplianceResponse>} A list of processed emails.
     */
    public async deleteInviteeData(
        emails: string[]
    ): Promise<DataComplianceResponse> {
        const body = JSON.stringify({
            emails
        });
        const url = `https://api.calendly.com/data_compliance/deletion/invitees`;
        return await this.fetchPost(url, body);
    }
}

export type DataComplianceResponse =
    | ErrorResponse
    | {
          emails: string[];
      };
