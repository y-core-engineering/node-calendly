/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : Api.ts
 *******************************************/
import stopcock from 'stopcock';
import { DEBUG_LEVEL, LogHandler } from '../Logger';

const logger = LogHandler.newInstance();
const LOG_NAMESPACE = 'API CALL';

export type Options = {
    timeout?: number;
    limit?: number;
    interval?: number;
    bucketSize?: number;
};

export type RequestOptions = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: any;
    body?: any;
};

export default class CalendlyApiEndpoint {
    protected ACCESS_TOKEN: string;
    private options: Options;

    constructor(ACCESS_TOKEN: string, params?: Options) {
        this.options = {
            timeout: params?.timeout || 60000,
            limit: params?.limit || 2,
            interval: params?.interval || 1000,
            bucketSize: params?.bucketSize || 35
        };
        this.ACCESS_TOKEN = ACCESS_TOKEN;
        // this.fetchGet = stopcock(this.fetchGet, this.options);
        // this.fetchPost = stopcock(this.fetchPost, this.options);
        this.request = stopcock(this.request, this.options);
    }

    protected async fetchGet(url: string) {
        return this.request(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
    }

    protected async fetchPost(url: string, body: string) {
        return this.request(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.ACCESS_TOKEN}`
            },
            body
        });
    }

    protected async request(
        uri: string,
        options: RequestOptions
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(uri, options)
                .then((response) => {
                    // console.log(response.headers);
                    if (response.status === 429) {
                        reject('Too many requests');
                    } else if (!response.ok) {
                        logger.error(
                            `Error fetching data. Response status ${response.status}`,
                            LOG_NAMESPACE,
                            'request'
                        );
                        console.error(
                            uri,
                            response.status,
                            response.statusText
                        );
                        if (DEBUG_LEVEL === 'debug') console.error(options);
                    }
                    if (response.status === 202) {
                        return null;
                    }

                    return response.json().catch((error) => {
                        logger.error(
                            `Error parsing response: ${error}`,
                            LOG_NAMESPACE,
                            'request'
                        );
                        return null;
                    });
                })
                .then((data) => {
                    if (data === null) {
                        resolve(null);
                    }
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
