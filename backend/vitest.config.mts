import swc from 'unplugin-swc';
import {defineConfig} from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        root: './',
        testTimeout: 15000,
        hookTimeout: 15000,
        reporters: [
            ['default', {summary: true}]
        ],
    },
    plugins: [
        swc.vite({
            module: {type: 'es6'},
        }),
    ],
});
