/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : EventTypes.ts
 *******************************************/
export interface OrganizationProvider {
    getOrganizationUri(): Promise<string>;
}

export interface MeProvider {
    getMe(): Promise<string>;
}
