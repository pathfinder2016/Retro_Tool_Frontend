import Vue from 'vue'
import Router from 'vue-router'
import Retro from '@/components/retro/page/Retro'
import Action from '@/components/retro/component/Action'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/retro',
            name: 'retro',
            component: Retro
        }, {
            path: '/action',
            name: 'action',
            component: Action
        }
    ]
})
