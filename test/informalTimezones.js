import informalTimezones from '../src/informalTimezones';
import test from 'ava';

test('informalTimezones has IST', async t => {
    t.true(typeof informalTimezones['IST'] !== 'undefined');
});
