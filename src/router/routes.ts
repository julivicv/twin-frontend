import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/:page?',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }],
  },

  {
    path: '/Login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/LoginPage.vue') },
    ],
  },

  {
    path: '/createShop',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/CreateStorePage.vue') },
    ],
  },

  {
    path: '/confirmEmail',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/ConfirmEmail.vue') },
    ],
  },

  {
    path: '/Cadastro',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/CadastroPage.vue') },
    ],
  },

  {
    path: '/home',
    meta: { requiresAuth: false },
    component: () => import('layouts/HeaderLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/HomePage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
