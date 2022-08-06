import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import legacy from '@vitejs/plugin-legacy'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            reactivityTransform: true, // ->  支持属性默认值选项
        }),
        // legacy({
        //     targets: ['defaults', 'not IE 11'],
        // }),
    ],
    resolve: {
        alias: [
            {
                // find: /@\//,
                find: '@/',
                replacement: path.resolve(__dirname, 'src') + '/',
            },
        ],
    },
})
