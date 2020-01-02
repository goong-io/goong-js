import {test} from '../util/test';
import fs from 'fs';

test('dev build contains asserts', (t) => {
    t.assert(fs.readFileSync('dist/goong-js-dev.js', 'utf8').indexOf('canary assert') !== -1);
    t.end();
});
