import Vue from 'vue'
import Router from 'vue-router'
import Retro from '@/components/retro/page/Retro'
import dragKanban from '@/components/retro/page/dragKanban'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/retro',
      name: 'retro',
      component: Retro
    },
    {
      path: '/dragKanban',
      name: 'dragKanban',
      component: dragKanban
    }
  ]
})
