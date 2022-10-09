import type { VNode } from 'vue'
import * as VueRouter from 'vue-router'

const routes = [
    {
        path: '/',
        component: {
            render: (h) => h('div', ['home']),
        },
    },
    {
        path: '/about',
        component: {
            template: '<div>about</div>',
        },
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

export default router
