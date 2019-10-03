import { checkAuth, checkNoAuth } from 'src/utils/helpers'

const routes = [
  {
    path: '/login',
    exact: true,
    beforeEnter: checkNoAuth,
    component: () => import('layouts/Default.vue'),
    children: [
      {
        name: 'login',
        path: '',
        component: () => import('pages/Login.vue')
      }
    ]
  },
  {
    path: '/',
    beforeEnter: checkAuth,
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') },
      { path: 'customers', component: () => import('pages/Customers') },
      { path: 'bookings', component: () => import('pages/Bookings') },
      { path: 'calendar', component: () => import('pages/Calendar.vue') },
      { path: 'refunds', component: () => import('pages/Refunds.vue') },
      { path: 'documents', component: () => import('pages/Documents.vue') },
      { path: 'finances', component: () => import('pages/Finances.vue') },
      {
        path: 'settings',
        component: () => import('pages/Settings.vue'),
        children: [
          { path: '', component: () => import('components/Settings/Room/index.vue') },
          { path: 'room', component: () => import('components/Settings/Room/index.vue') },
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
