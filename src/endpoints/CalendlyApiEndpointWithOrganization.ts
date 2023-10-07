/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : ApiWithOrganization.ts
 *******************************************/

import CalendlyApiEndpoint from './CalendlyApiEndpoint';
import { OrganizationProvider } from './Provider';

export default class CalendlyApiEndpointWithOrganization extends CalendlyApiEndpoint {
    protected organizationProvider: OrganizationProvider;

    constructor(
        ACCESS_TOKEN: string,
        organizationProvider: OrganizationProvider
    ) {
        super(ACCESS_TOKEN, {
            timeout: 60000,
            limit: 8,
            interval: 1000,
            bucketSize: 35
        });

        this.organizationProvider = organizationProvider;
    }
}
