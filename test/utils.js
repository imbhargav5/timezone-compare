import test from 'ava';
import {NUM_HOURS, trim, findTimezone,isValidMomentTimezone, getValidZoneName} from '../src/utils';
import informalTimezones from '../src/informalTimezones';
// test('foo', t => {
//     t.pass();
// });
//
// test('NUM_HOURS is 30', async t => {
//     const bar = Promise.resolve('bar');
//
//     t.is(await bar, 'bar');
//     t.is(NUM_HOURS, 30);
// });

test('NUM_HOURS is 24', async t => {
    t.is(NUM_HOURS, 24);
});
test('isValidMomentTimezone(GMT) is false', async t => {
    t.true(isValidMomentTimezone('GMT'));
});
test('isValidMomentTimezone(IST) is false', async t => {
  t.false(isValidMomentTimezone('IST'));
});
test('findTimezone works correctly for valid inputs', async t => {
    t.is(findTimezone('IST'),informalTimezones['IST']);
    t.pass(typeof findTimezone('GMT+1') !== 'undefined');
});
test('getValidZoneName throws error for invalid inputs', async t => {
      t.throws(()=>{
        getValidZoneName('asdf');
      }, Error);

      t.throws(()=>{
        getValidZoneName('GMT*2');
      }, Error);
      t.throws(()=>{
        getValidZoneName('');
      }, Error);
});
