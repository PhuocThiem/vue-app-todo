import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import lodash from './mixin/lodash';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

const mixins = [lodash];
mixins.forEach(mixin => Vue.mixin(mixin));

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
