/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : DataCompliance.ts
 *******************************************/

import { ErrorResponse } from '../types/ErrorResponse';
import CalendlyApiEndpoint from './CalendlyApiEndpoint';

export default class DataCompliance extends CalendlyApiEndpoint {
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

type DataComplianceResponse =
    | ErrorResponse
    | {
          emails: string[];
      };
