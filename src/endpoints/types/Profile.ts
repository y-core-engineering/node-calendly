/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : Profile.ts
 *******************************************/

/**
 * The publicly visible profile of a User or a Team that's associated with the Event Type (note: some Event Types don't have profiles).
 * @export
 * @interface Profile
 * @see https://developer.calendly.com/api-docs/c2NoOjU5MTM5NQ-profile
 */
export type Profile = {
    type: 'User' | 'Team';
    name: string;
    owner: string;
};
