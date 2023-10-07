/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : Api.ts
 *******************************************/
import stopcock from 'stopcock';

export type Options = {
    timeout?: number;
    limit?: number;
    interval?: number;
    bucketSize?: number;
};

export default class CalendlyApiEndpoint {
    protected ACCESS_TOKEN: string;
    private options: Options;

    constructor(ACCESS_TOKEN: string, params?: Options) {
        this.options = {
            timeout: params?.timeout || 60000,
            limit: params?.limit || 10,
            interval: params?.interval || 1000,
            bucketSize: params?.bucketSize || 35
        };
        this.ACCESS_TOKEN = ACCESS_TOKEN;
        this.fetchGet = stopcock(this.fetchGet, this.options);
        this.fetchPost = stopcock(this.fetchPost, this.options);
    }

    protected async fetchGet(url: string) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data && data.message)
            throw new Error(data.title + ': ' + data.message);
        return data;
    }

    protected async fetchPost(url: string, body: string) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.ACCESS_TOKEN}`
            },
            body
        });
        const data = await response.json();
        if (data && data.message)
            throw new Error(data.title + ': ' + data.message);
        return data;
    }
}
