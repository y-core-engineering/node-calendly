/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : Api.ts
 *******************************************/
export default class CalendlyApiEndpoint {
    protected ACCESS_TOKEN: string;

    constructor(ACCESS_TOKEN: string) {
        this.ACCESS_TOKEN = ACCESS_TOKEN;
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
