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
    path: '/createProduct',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/CreateProductPage.vue') },
    ],
  },
  {
    path: '/shops',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/Shops.vue') }],
  },

  {
    path: '/createShop',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/CreateStorePage.vue') },
    ],
  },

  {
    path: '/contato',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/ContatoPage.vue') },
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

  {
    path: '/product/:id',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/ProductPage.vue') },
    ],
  },
  {
    path: '/shop/:id',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/StorePage.vue') },
    ],
  },
  {
    path: '/carrinho',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/CartPage.vue') }],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
