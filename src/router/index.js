import Vue from 'vue'
import Router from 'vue-router'
import Retro from '@/components/retro/page/Retro'
import Retro2 from '@/components/retro/page/Retro2'
import Card from '@/components/retro/component/Card'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/retro',
      name: 'retro',
      component: Retro
    },{
      path: '/retro2',
      name: 'retro2',
      component: Retro2
    },{
      path: '/card',
      name: 'card',
      component: Card
    }
  ]
})
