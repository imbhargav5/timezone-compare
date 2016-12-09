import test from 'ava';
import TimezoneCompare from '../src/TimezoneCompare';

test('TimezoneCompare returns an object with 2 arrays for valid data', async t => {
    const tz = new TimezoneCompare('IST', 'GMT');
    const {timezones, times} = tz.getTimesAsStrings();
    t.true(Array.isArray(timezones));
    t.true(Array.isArray(times));
});
