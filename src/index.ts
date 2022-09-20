/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Tue Sep 20 2022
 *  File : index.ts
 *******************************************/

import { config } from 'dotenv';
import Calendly from './Calendly';

config();

const CALENDLY_ACCESS_TOKEN = process.env.CALENDLY_ACCESS_TOKEN || '';

const calendly: Calendly = new Calendly(CALENDLY_ACCESS_TOKEN);

calendly.getMe().then((me) => {
    const uuid = Calendly.getUuidFromUri(me);
    if (uuid) {
        console.log('UUID:', uuid);
        calendly.users.getUser({ uuid }).then((user) => {
            console.log('user:', user);
        });
    }
});
