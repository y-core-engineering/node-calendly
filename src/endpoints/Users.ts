/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : EventTypes.ts
 *******************************************/
import CalendlyApiEndpoint from './CalendlyApiEndpoint';
import User from './types/User';

/**
 * The event types endpoint.
 * @export default
 * @class EventTypes
 * @extends {CalendlyApiEndpoint}
 * @see https://developer.calendly.com/api-docs/ff9832c5a6640-get-user
 */
export default class Users extends CalendlyApiEndpoint {
    /**
     * Returns basic information about your user account.
     * @returns {Promise<User>} The current user.
     * @see https://developer.calendly.com/api-docs/005832c83aeae-get-current-user
     * @example const user = await calendly.users.getCurrentUser();
     *
     */
    public async getCurrentUser(): Promise<User> {
        return this.getUser({ uuid: 'me' });
    }

    /**
     * Returns information about a specified User.
     * @param params The request parameters.
     * @returns  {Promise<User>} The user.
     * @see https://developer.calendly.com/api-docs/ff9832c5a6640-get-user
     * @example const user = await calendly.users.getUser({ uuid: 'user-uuid' });
     */
    public async getUser(params: UserQueryParameters): Promise<User> {
        const url = `https://api.calendly.com/users/${params.uuid}`;
        const response = await this.fetchGet(url);
        return User.fromJson(response.resource);
    }
}

export type UserQueryParameters = {
    uuid: string;
};
