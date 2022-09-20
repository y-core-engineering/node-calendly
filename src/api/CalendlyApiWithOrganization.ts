/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : ApiWithOrganization.ts
 *******************************************/

import CalendlyApiPart from '../CalendlyApiPart';
import { OrganizationProvider } from '../Provider';

export default class CalendlyApiWithOrganization extends CalendlyApiPart {
    protected organizationProvider: OrganizationProvider;

    constructor(
        ACCESS_TOKEN: string,
        organizationProvider: OrganizationProvider
    ) {
        super(ACCESS_TOKEN);
        this.organizationProvider = organizationProvider;
    }
}
