import replace from 'rollup-plugin-replace';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import unassert from 'rollup-plugin-unassert';
import json from 'rollup-plugin-json';
import {flow} from '../../build/rollup_plugins';

// Build es modules?
const esm = 'esm' in process.env;

const transforms = {
    dangerousForOf: true,
    modules: esm ? false : undefined
};

const config = [{
    input: `${__dirname}/style-spec.js`,
    output: {
        name: 'goongjsStyleSpecification',
        file: `${__dirname}/dist/${esm ? 'index.es.js' : 'index.js'}`,
        format: esm ? 'esm' : 'umd',
        sourcemap: true
    },
    plugins: [
        // https://github.com/zaach/jison/issues/351
        replace({
            include: /\/jsonlint-lines-primitives\/lib\/jsonlint.js/,
            delimiters: ['', ''],
            values: {
                '_token_stack:': ''
            }
        }),
        flow(),
        json(),
        buble({transforms, objectAssign: "Object.assign"}),
        unassert(),
        resolve({
            browser: true,
            preferBuiltins: false
        }),
        commonjs()
    ]
}];
export default config;
