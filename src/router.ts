import { createWebHashHistory, createRouter } from "vue-router"
import homeVue from "./views/home.vue"

const routes = [
    {
        path: '/',
        component: homeVue
    },
    {
        path: '/work',
        component: () => import('./views/work.vue'),
        children: [
            {
                path: 'info',
                component: () => import('./views/panes/info.vue'),
            },
            {
                path: 'ui',
                component: () => import('./views/panes/ui.vue'),
            },
            {
                path: 'event',
                component: () => import('./views/panes/event.vue'),
            },
            {
                path: 'state',
                component: () => import('./views/panes/state.vue'),
            },
            {
                path: 'vari',
                component: () => import('./views/panes/vari.vue'),
            },
            {
                path: 'actor',
                component: () => import('./views/panes/actor.vue'),
            },
            {
                path: 'get',
                component: () => import('./views/panes/get.vue'),
            }
        ]
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router
