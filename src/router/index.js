import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'
import home from '@/pages/home'
import search from '@/pages/search'

import list from '@/pages/list'

import detail1 from '@/pages/detail1'
import detail2 from '@/pages/detail2'
import detail4 from '@/pages/detail4'

import login from '@/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: 'index',
          name: 'index',
          component: index,
        },
        {
          path: 'search/:id',
          name: 'search',
          component: search,
        },
        {
          path: 'list/:string',
          name: 'list',
          component: list,
        },
        {
          path: 'detail1/:string',
          name: 'detail1',
          component: detail1,
        },
        

        {
          path: 'detail2/:string',
          name: 'detail2',
          component: detail2,
        },
        {
          path: 'detail4/:string',
          name: 'detail4',
          component: detail4,
        }
    ]
    }
  ]
})

