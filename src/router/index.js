import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'
import home from '@/pages/home'
import search from '@/pages/search'
import detail from '@/pages/detail'
import detail1 from '@/pages/detail1'
import detail1_1 from '@/pages/detail1_1'
import detail2 from '@/pages/detail2'
import detail4 from '@/pages/detail4'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
          path: 'detail/:string',
          name: 'detail',
          component: detail,
        },
        {
          path: 'detail1/:string',
          name: 'detail1',
          component: detail1,
        },
        {
          path: 'detail1_1/:string',
          name: 'detail1_1',
          component: detail1_1,
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

// Router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//       // if (store.state.token) {  // 通过vuex state获取当前的token是否存在
//       //     next();
//       // }
//       // else {
//       //     next({
//       //         path: '/login',
//       //         query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       //     })
//       // }
//       next();
//   }
//   else {
//       next();
//   }
// })
