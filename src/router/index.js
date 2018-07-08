import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Retro from '@/components/retro/page/Retro'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'retro',
      component: Retro
    }
  ]
})
