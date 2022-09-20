/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Tue Sep 20 2022
 *  File : DataCompliance.test.ts
 *******************************************/
import { config } from 'dotenv';
config();

import DataCompliance from '../endpoints/DataCompliance';

const TEST_EMAILS: string[] = ['outerspace@nasa.gov', 'test@test.de'];

const CALENDLY_ACCESS_TOKEN = process.env.CALENDLY_ACCESS_TOKEN || '';

jest.spyOn(global, 'fetch').mockImplementation(
    jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    email: TEST_EMAILS
                })
        })
    ) as jest.Mock
);

test('DataCompliance is instantiable', () => {
    expect(new DataCompliance(CALENDLY_ACCESS_TOKEN)).toBeInstanceOf(
        DataCompliance
    );
});

test('DataCompliance can delete invitee data', async () => {
    const dataCompliance = new DataCompliance(CALENDLY_ACCESS_TOKEN);
    const result = await dataCompliance.deleteInviteeData(TEST_EMAILS);
    expect(result).toStrictEqual({
        email: TEST_EMAILS
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
        'https://api.calendly.com/data_compliance/deletion/invitees',
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${CALENDLY_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emails: TEST_EMAILS
            })
        }
    );
});
