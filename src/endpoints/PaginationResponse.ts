/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : PaginationResponse.ts
 *******************************************/

/**
 * A paginated response of type T.
 * @export
 * @interface PaginationResponse
 * @template T The type of the response.
 * @see https://developer.calendly.com/api-docs/ZG9jOjE1MDE3NzI-api-conventions
 */
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
