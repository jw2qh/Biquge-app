import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Sort from './views/Sort.vue'
import Top from './views/Top.vue'
import Wapfull from './views/Wapfull.vue'
import Postdate from './views/Postdate.vue'
import Details from './views/Details.vue'
import Login from './views/Login.vue'
import Registered from './views/Registered.vue'
import Content from './views/Content.vue'
import Bookshelf from './views/Bookshelf.vue'
import Find from './views/Find.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
          path: '/sort',
          name: 'Sort',
          component: Sort,
      },
      {
          path: '/top',
          name: 'Top',
          component: Top,
      },
      {
          path: '/wapfull/1.html',
          name: 'Wapfull',
          component: Wapfull,
      },
      {
          path: '/top/postdate_1',
          name: 'Postdate',
          component: Postdate,
      },
      {
          path: '/details/:id',
          name: 'Details',
          component: Details,
      },
      {
          path: '/content/:id',
          name: 'Content',
          component: Content,
      },
      {
          path: '/login',
          name: 'Login',
          component: Login,
      },
      {
          path: '/registered',
          name: 'Registered',
          component: Registered,
      },
      {
          path: '/bookshelf',
          name: 'Bookshelf',
          component: Bookshelf,
      },
      {
          path: '/find',
          name: 'Find',
          component: Find,
      },
  ]
})
