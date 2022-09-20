/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Tue Sep 20 2022
 *  File : CalendlyApiEndpoint.test.ts.ts
 *******************************************/

import { config } from 'dotenv';
import CalendlyApiEndpoint from '../endpoints/CalendlyApiEndpoint';
import CalendlyApiEndpointWithOrganization from '../endpoints/CalendlyApiEndpointWithOrganization';
import { OrganizationProvider } from '../endpoints/Provider';
config();

const CALENDLY_ACCESS_TOKEN = process.env.CALENDLY_ACCESS_TOKEN || '';

jest.clearAllMocks();

jest.spyOn(global, 'fetch').mockImplementation(
    jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({})
        })
    ) as jest.Mock
);

beforeEach(() => {
    jest.clearAllMocks();
});

test('CalendlyApiEndpoint is instantiable', () => {
    expect(new CalendlyApiEndpoint(CALENDLY_ACCESS_TOKEN)).toBeInstanceOf(
        CalendlyApiEndpoint
    );
});

test('CalendlyApiEndpointWithOrganization is instantiable', () => {
    expect(
        new CalendlyApiEndpointWithOrganization(
            CALENDLY_ACCESS_TOKEN,
            new TestOrganizationProvider()
        )
    ).toBeInstanceOf(CalendlyApiEndpointWithOrganization);
});

test('CalendlyApiEndpointWithOrganization can get the current organization provider', async () => {
    const organizationProvider: OrganizationProvider =
        new TestOrganizationProvider();
    const calendlyApiEndpointWithOrganization: TestApiEndpoint =
        new TestApiEndpoint(CALENDLY_ACCESS_TOKEN, organizationProvider);
    const organization =
        await calendlyApiEndpointWithOrganization.getOrganization();
    expect(organization).toBe('https://api.calendly.com/organizations/123');
});

test('CalendlyApiEndpoint fetchget', async () => {
    const calendlyApiEndpoint = new TestApiEndpoint(
        CALENDLY_ACCESS_TOKEN,
        new TestOrganizationProvider()
    );
    const uri = 'https://api.calendly.com/users/me';
    const result = await calendlyApiEndpoint.getTest(uri);
    expect(result).toStrictEqual({});
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(uri, {
        headers: {
            Authorization: `Bearer ${CALENDLY_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        method: 'GET'
    });
});

test('CalendlyApiEndpoint fetchpost', async () => {
    const calendlyApiEndpoint = new TestApiEndpoint(
        CALENDLY_ACCESS_TOKEN,
        new TestOrganizationProvider()
    );
    const uri = 'https://api.calendly.com/users/me';
    const result = await calendlyApiEndpoint.postTest(
        uri,
        JSON.stringify({
            test: 'test'
        })
    );
    expect(result).toStrictEqual({});
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(uri, {
        headers: {
            Authorization: `Bearer ${CALENDLY_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            test: 'test'
        })
    });
});

class TestApiEndpoint extends CalendlyApiEndpointWithOrganization {
    public async getTest(uri: string) {
        return this.fetchGet(uri);
    }
    public async postTest(uri: string, body: string) {
        return this.fetchPost(uri, body);
    }
    public async getOrganization() {
        return await this.organizationProvider.getOrganizationUri();
    }
}

class TestOrganizationProvider implements OrganizationProvider {
    getOrganizationUri(): Promise<string> {
        return Promise.resolve('https://api.calendly.com/organizations/123');
    }
}
