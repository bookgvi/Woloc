
const routes = [
  {
    path: '/',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'customers', component: () => import('pages/Customers') },
      { path: 'bookings', component: () => import('pages/Bookings') },
      { path: 'calendar', component: () => import('pages/Calendar.vue') },
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
