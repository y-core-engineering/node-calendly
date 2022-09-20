/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : PaginationResponse.ts
 *******************************************/

export type PaginationResponse<T> = {
    collection: [T];
    pagination: {
        count: number;
        next_page: string;
        previous_page: string;
        next_page_token: string;
        previous_page_token: string;
    };
};
