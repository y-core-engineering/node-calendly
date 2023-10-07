/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : ApiWithOrganization.ts
 *******************************************/

import CalendlyApiEndpoint, { Options } from './CalendlyApiEndpoint';
import { OrganizationProvider } from './Provider';

export default class CalendlyApiEndpointWithOrganization extends CalendlyApiEndpoint {
    protected organizationProvider: OrganizationProvider;

    constructor(
        ACCESS_TOKEN: string,
        organizationProvider: OrganizationProvider,
        params?: Options
    ) {
        super(ACCESS_TOKEN, params);
        this.organizationProvider = organizationProvider;
    }
}
