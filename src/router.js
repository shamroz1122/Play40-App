import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './views/Dashboard/DefaultLayout.vue'
import Splash from './views/Splash.vue'
import Account from './views/Account.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Tutorial from './views/Tutorial.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'splash',
      component: Splash
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: Tutorial
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/lists',
      name: '',
      component: DefaultLayout,
      children: [ 
        {
          path: '/lists',
          name: 'lists',
          component: () => import(/* webpackChunkName: "main" */ './views/Dashboard/Lists.vue')
        },
        {
          path: '/goals',
          name: 'goals',
          component: () => import(/* webpackChunkName: "main" */ './views/Dashboard/Goals.vue')
        },
        {
          path: '/cycle',
          name: 'cycle',
          component: () => import(/* webpackChunkName: "main" */ './views/Dashboard/Cycle.vue')
        },
        {
          path: '/addcycle/:cycleId?',
          name: 'addcycle',
          component: () => import(/* webpackChunkName: "main" */ './views/Dashboard/Addcycle.vue')
        },
        // {
        //   path: '/editcycle/:cycleId',
        //   name: 'editcycle',
        //   component: () => import(/* webpackChunkName: "main" */ './views/Dashboard/EditCycle.vue')
        // },
        {
          path: '/viewcycle/:cycleId',
          name: 'viewcycle',
          component: () => import(/* webpackChunkName: "main" */ './views/Dashboard/ViewCycle.vue')
        },
        {
          path: '/archive',
          name: 'archive',
          component: () => import(/* webpackChunkName: "main" */ './views/Dashboard/Archive.vue')
        },
        {
          path: '/saved',
          name: 'saved',
          component: () => import(/* webpackChunkName: "main" */ './views/Dashboard/SaveCycle.vue')
        }
      ]
      },
    ]
})
