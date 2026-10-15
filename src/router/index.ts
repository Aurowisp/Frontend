import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: '福帮帮 - 首页', showNav: true }
  },
  {
    path: '/idle',
    name: 'IdleMarket',
    component: () => import('../views/IdleMarket.vue'),
    meta: { title: '二手闲置 - 福帮帮', showNav: true }
  },
  {
    path: '/forum',
    name: 'ForumList',
    component: () => import('../views/ForumList.vue'),
    meta: { title: '校园论坛 - 福帮帮', showNav: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { title: '个人中心 - 福帮帮', showNav: true }
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail.vue'),
    meta: { title: '商品详情 - 福帮帮', showNav: false }
  },
  {
    path: '/forum/:id',
    name: 'PostDetail',
    component: () => import('../views/PostDetail.vue'),
    meta: { title: '帖子详情 - 福帮帮', showNav: false }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
