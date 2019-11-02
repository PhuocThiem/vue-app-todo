import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import lodash from './mixin/lodash';

Vue.config.productionTip = false;

const mixins = [lodash];
mixins.forEach(mixin => Vue.mixin(mixin));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
