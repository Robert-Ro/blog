import * as VueRouter from 'vue-router'
import { h } from 'vue'

const routes = [
    {
        path: '/',
        component: {
            render: () => h('div', ['home']),
        },
    },
    {
        path: '/about',
        component: {
            render: () => h('div', [h('span', ['about'])]),
        },
    },
    {
        path: '/ts',
        component: () => import('@/components/TsDemo.vue'),
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

export default router
