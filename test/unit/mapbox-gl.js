import {test} from '../util/test';
import goongjs from '../../src';

test('goongjs', (t) => {
    t.test('version', (t) => {
        t.ok(goongjs.version);
        t.end();
    });

    t.test('workerCount', (t) => {
        t.ok(typeof goongjs.workerCount === 'number');
        t.end();
    });
    t.end();
});
