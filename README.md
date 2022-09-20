# Calendly API Node.js

Calendly API bindings for Node.js

## Installation

`$ npm install --save calendly`

## API

The API is accessed by a central object that constructs the endpoints to the Calendly API.

This module implements the Calendly API v2.0.0:
https://developer.calendly.com/api-docs/d7755e2f9e5fe-calendly-api

### `Calendly(ACCESS_TOKEN:string)`

Creates a new `Calendly` instance. **NOTE:** Currently only **_personal access tokens_** are implemented, used for **_internal applications_**.

#### Arguments

-   `ACCESS_TOKEN` - _Required_ - A string containing the ACCESS_TOKEN for Calendly. You can create your private ACCESS_TOKEN via Calendly web site. See https://developer.calendly.com/getting-started

#### Return value

A `Calendly` instance.

#### Example

```ts
import Calendly from 'node-calendly';

const calendly: Calendly = new Calendly(CALENDLY_ACCESS_TOKEN);
```

### API call limits

No Calendly call limits known and implemented.

## API endpoints

Every endpoint is accessed via your `node-calendly`instance:

```ts
const calendly: Calendly = new Calendly(CALENDLY_ACCESS_TOKEN);

// calendly.<endpoint_name>.<method_name>
```

Each endpoint returns a `Promise`that resolves with the result:

```ts
calendly.users
    .getUser({ uuid: 'user-uuid' })
    .then((user) => console.log('user:', user))
    .catch((err) => console.error(err));
```

**_async/await_** can also be used:

```ts
try {
    const user : User = await calendly.users.getUser({ uuid: 'user-uuid' });
    console.log('user:', user))
} catch(err){
    console.error(err)
};
```

The Calendly API requires that you send a valid JSON string in the request body or request parameters. For example, the request parameters to `List Events` should be:

```shell
    https://api-endpoint/?count=20&sort=asc

```

When using the module `node-calendly` you don't have to specify the full request path as the module automatically wraps the provided data. Using the above example this translates to:

```ts
calendly.scheduledEvents
    .listEvents({
        count: 20,
        sort: 'asc'
    })
    .then((events) => console.log('events:', events))
    .catch((error) => console.error('error:', error));
```

Similarly, the Calendly API returns different response body information like pagination and collection.

The module `node-calendly` automatically unwraps the parsed object and returns:

```json
{
    "collection": [
        {
            "uri": "uri",
            "name": "30 mins initial call",
            "location": {
                "type": "outbound_call",
                "location": "+1123456789"
            }
            ...
        }
    ],
    "pagination": {
        "count": 200,
        "next_page": "next page"
        ...
    }
}
```

This behaviour is valid for all resources.

## Pagination

Also referred to as "cursor-based pagination", this approach is how calendly handles pagination for all API endpoints that can return a collection of multiple resources. Unlike offset-limit pagination, this approach allows to provide accurate data to users, despite resources possibly being added/removed to the collection on subsequent page retrievals.

When calling an endpoint that returns a collection of multiple resources, you will have a pagination object in the response. Inside of the pagination object is a `next_page` attribute. If there are more resources than what has been returned, the `next_page` attribute will contain the URL to the next page of resources; otherwise, `next_page` will be `null`:

[Pagination][calendly-api-pagination] in Calendly API version v2.0.0 and above can be done as shown in the following example:

```ts
(async () => {
    calendly.getOrganizationUri().then(async (uri) => {
        let nextPageToken;

        do {
            const events: PaginationResponse<EventType> =
                await calendly.scheduledEvents.listEvents({
                    organization: uri,
                    page_token: nextPageToken,
                    count: 100
                });
            console.log(events.collection);
            if (events) {
                nextPageToken = events.pagination.next_page_token;
            }
        } while (nextPageToken);
    });
})().catch(console.error);
```

Each set of results have the `nextPageToken` and `previous_page_token` properties. These properties specify respectively the parameters needed to fetch the next and previous page of results.

## Available API endpoints and methods

-   `activityLog : ActivityLog`
    -   `listActivityLogEntries(params: ActivityLogQueryParams) : Promise<ActivityLogResponse>`
-   `dataCompliance : DataCompliance`
    -   `deleteInviteeData(emails: string[]): Promise<DataComplianceResponse>`
-   `eventTypes: EventTypes`
    -   `listUsersEventTypes(params: EventTypeUserRequest): Promise<PaginationResponse<EventType>>` If user is not specified in params, the current user is used.
    -   `listOrganisationEventTypes(params: EventTypeOrganisationRequest): Promise<PaginationResponse<EventType>>` If organization is not specified, the current organization is used.
    -   `getEventType({ uuid }: { uuid: string }): Promise<EventType>`
    -   `listEventAvailableTimes(params: EventTypeAvailableTimeRequest): Promise<EventTypeAvailableTimeResponse>`
-   `scheduledEvents: ScheduledEvents`
    -   `listEvents(params: ListEventsRequestParams): Promise<PaginationResponse<EventDefinition>>`
    -   `listEventInvitees(uuid: string,params: ListEventInviteesRequestParams): Promise<PaginationResponse<Invitee> & ErrorResponse>`
-   `users: Users`
    -   `getCurrentUser(): Promise<User>`
    -   `getUser(params: UserQueryParameters): Promise<User>`

### Currently unimplemented API andpoints and methods

-   `scheduledEvents: ScheduledEvents`

    -   `getEventInvitee`
    -   `getEvent`
    -   `getInviteeNoShow`
    -   `deleteInviteeNoShow`
    -   `createInviteeNoShow` -`cancelEvent`

-   `Organizations`
-   `Routing Forms`
-   `Scheduling Links`
-   `Webhooks`
-   `OAuth 2.0`

## License

[MIT](LICENSE)

[calendly-api-pagination]: https://developer.calendly.com/api-docs/ZG9jOjE1MDE3NzI-api-conventions#keyset-based-pagination
