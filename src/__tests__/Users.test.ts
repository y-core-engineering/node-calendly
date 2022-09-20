/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Tue Sep 20 2022
 *  File : Users.test.ts
 *******************************************/
import { config } from 'dotenv';
import Calendly from '../Calendly';
import User from '../endpoints/types/User';
config();

const CALENDLY_ACCESS_TOKEN = process.env.CALENDLY_ACCESS_TOKEN || '';

let calendly: Calendly;

jest.spyOn(global, 'fetch').mockImplementation(
    jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    resource: {
                        uri: 'https://api.calendly.com/users/GBGBDCAADAEDCRZ2'
                    }
                })
        })
    ) as jest.Mock
);

beforeEach(() => {
    calendly = new Calendly(CALENDLY_ACCESS_TOKEN);
});

test('Get current user', async () => {
    const user: User = await calendly.users.getCurrentUser();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
        'https://api.calendly.com/users/me',
        {
            headers: {
                Authorization: `Bearer ${CALENDLY_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }
    );
    expect(user).toBeInstanceOf(User);
    expect(user.uri).toBe('https://api.calendly.com/users/GBGBDCAADAEDCRZ2');
});
