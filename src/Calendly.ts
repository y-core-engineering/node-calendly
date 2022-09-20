/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : CalendlyGateway.ts
 *******************************************/

import ActivityLog from './endpoints/ActivityLog';
import DataCompliance from './endpoints/DataCompliance';
import EventTypes from './endpoints/EventTypes';
import ScheduledEvents from './endpoints/ScheduledEvents';
import Users from './endpoints/Users';
import { MeProvider, OrganizationProvider } from './Provider';

export default class Calendly implements OrganizationProvider, MeProvider {
    private ACCESS_TOKEN: string;

    users: Users;
    activityLog: ActivityLog;
    dataCompliance: DataCompliance;
    eventTypes: EventTypes;
    scheduledEvents: ScheduledEvents;

    constructor(ACCESS_TOKEN: string) {
        this.ACCESS_TOKEN = ACCESS_TOKEN;
        this.users = new Users(this.ACCESS_TOKEN);
        this.activityLog = new ActivityLog(this.ACCESS_TOKEN, this);
        this.dataCompliance = new DataCompliance(this.ACCESS_TOKEN);
        this.eventTypes = new EventTypes(this.ACCESS_TOKEN, this, this);
        this.scheduledEvents = new ScheduledEvents(this.ACCESS_TOKEN);
    }
    async getMe(): Promise<string> {
        const user = await this.users.getCurrentUser();
        return user.uri;
    }
    async getOrganizationUri(): Promise<string> {
        const user = await this.users.getCurrentUser();
        return user.current_organization;
    }

    public static getUuidFromUri(uri: string): string | undefined {
        return uri.split('/').pop();
    }
}
