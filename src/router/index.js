import Vue from 'vue'
import Router from 'vue-router'
import Retro from '@/components/retro/page/Retro'
import Retro2 from '@/components/retro/page/Retro2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/retro',
      name: 'retro',
      component: Retro
    },
    {
      path: '/retro2',
      name: 'retro2',
      component: Retro2
    }
  ]
})
