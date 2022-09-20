/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Fri Sep 16 2022
 *  File : ErrorResponse.ts
 *******************************************/

/**
 * An error response.
 * @export
 * @interface ErrorResponse
 * @see https://developer.calendly.com/api-docs/ZG9jOjE1MDE3NzI-api-conventions
 */
export type ErrorResponse = {
    message: string;
    title: string;
};
