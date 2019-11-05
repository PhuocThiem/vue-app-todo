import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Users from '../views/Users.vue';
// import store from '../store/user';

import Storage from '../service/storage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      public: true,
      onlyWhenLogout: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      public: true,
      onlyWhenLogout: true,
    },
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const token = Storage.getItem();

  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLogout = to.matched.some(record => record.meta.onlyWhenLogout);

  if (!isPublic && !token) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  }

  if (token && onlyWhenLogout) {
    return next('/');
  }

  return next();
});


export default router;
