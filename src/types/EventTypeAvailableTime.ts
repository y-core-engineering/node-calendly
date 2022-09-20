/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : EventTypeAvailableTime.ts
 *******************************************/
export type EventTypeAvailableTime = {
    status: string;
    invitees_remaining: number;
    start_time: Date;
    scheduling_url: string;
};

export type EventTypeAvailableTimeRequest = {
    end_time?: Date;
    start_time?: Date;
    event_type: string;
};

export type EventTypeAvailableTimeResponse = {
    collection: EventTypeAvailableTime[];
};
