import Vue from 'vue'
import Router from 'vue-router'
import Retro from '@/components/retro/page/Retro'
import Card from '@/components/retro/component/Card'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/retro',
      name: 'retro',
      component: Retro
    },{
      path: '/card',
      name: 'card',
      component: Card
    }
  ]
})
