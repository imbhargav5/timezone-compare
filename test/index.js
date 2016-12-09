import test from 'ava';
import {getTimesAsStrings} from '../src/index';
import {NUM_HOURS} from '../src/utils';

test('compareTimezones returns an array for valid data', async t => {
  const {times} = getTimesAsStrings('IST','GMT');
  t.pass(Array.isArray(times));
  t.is(times.length, (NUM_HOURS * 2) + 1);
});
