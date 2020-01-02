import fs from 'fs';

const version = JSON.parse(fs.readFileSync('package.json')).version;
export default `/* Goong JS is licensed under the 3-Clause BSD License */`;
