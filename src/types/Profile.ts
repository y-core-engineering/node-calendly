/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : Profile.ts
 *******************************************/

export type Profile = {
    type: 'User' | 'Team';
    name: string;
    owner: string;
};
