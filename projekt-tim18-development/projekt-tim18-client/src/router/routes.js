const routes = [
  {
    path: '/Login',
    component: () => import('layouts/LoginPageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login/LoginIndex.vue') }
    ]
  },
  {
    path: '/Administration',
    component: () => import('layouts/SystemLayout.vue'),
    children: [
      { path: '/Rezervacije', component: () => import('pages/projekt-tim18/RezervacijeIndex.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
