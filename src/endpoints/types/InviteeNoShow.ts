/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : InviteeNoShow.ts
 *******************************************/

/**
 * Information about an invitees no show.
 * @export
 * @interface InviteeNoShow
 * @see https://developer.calendly.com/api-docs/753a78b938d75-invitee-no-show
 */
export type InviteeNoShow = {
    uri: string;
    created_at: Date;
    invitee: string;
};
