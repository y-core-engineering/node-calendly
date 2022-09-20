import Calendly from '../Calendly';

const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';
const uri = 'https://api.calendly.com/users/me';

test('Calendly is instantiable', () => {
    expect(new Calendly(ACCESS_TOKEN)).toBeInstanceOf(Calendly);
});

test('Calendly transforms uris to uuids', () => {
    expect(Calendly.getUuidFromUri(uri)).toBe('me');
});
