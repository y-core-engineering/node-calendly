/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : EventTypes.ts
 *******************************************/
import CalendlyApiPart from '../CalendlyApiPart';
import { User } from '../types/User';

export default class Users extends CalendlyApiPart {
    public async getCurrentUser(): Promise<User> {
        return this.getUser({ uuid: 'me' });
    }

    public async getUser(params: UserQueryParameters): Promise<User> {
        const url = `https://api.calendly.com/users/${params.uuid}`;
        const response = await this.fetchGet(url);
        return User.fromJson(response.resource);
    }
}

export type UserQueryParameters = {
    uuid: string;
};
