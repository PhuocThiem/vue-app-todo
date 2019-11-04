import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Users from '../views/Users.vue';
// import store from '../store/user';

Vue.use(VueRouter);
// const ifNotAuthenticated = next => {
//   if (!store.getters.isAuthenticated) {
//     next();
//     return;
//   }
//   next('/');
// };

// const ifAuthenticated = next => {
//   if (store.getters.isAuthenticated) {
//     next();
//     return;
//   }
//   next('/login');
// };
const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register,
    // beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    // beforeEnter: ifAuthenticated,
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    // beforeEnter: ifAuthenticated,
  },
];

// routes.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   if (authRequired && !loggedIn) {
//     return next('/login');
//   }
//   next();
// });

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
