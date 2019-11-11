<template>
  <v-app>
    <div v-if="_.get($route, 'meta.public', false) && _.get($route, 'meta.onlyWhenLogout', false)">
      <router-view />
    </div>
    <div v-else>
      <v-app-bar clipped-left app color="indigo" dark v-show="isLoggedIn">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Todo</v-toolbar-title>
        <div class="mb-10">
          <v-btn color="warning" fab small dark position: absolute right @click.prevent="logOut()">
            <v-icon>mdi-account-convert</v-icon>
          </v-btn>
        </div>
      </v-app-bar>
      <v-navigation-drawer
      clipped v-model="drawer"
      app color="indigo accent-1"
      v-show="isLoggedIn">
        <v-list dense>
          <v-list-item :to="item.to" v-for="(item, index) in menu" :key="index">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-content>
        <router-view />
      </v-content>
    </div>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import { get } from 'lodash';

import { SET_TOKEN_TO_HEADERS } from './constant/muationPypes';
import Storage from './service/storage';

export default {
  name: 'App',
  components: {},
  data: () => ({
    drawer: null,
    menu: [
      {
        name: 'Home',
        icon: 'mdi-home',
        to: '/',
      },
      {
        name: 'Users',
        icon: 'mdi-account-plus-outline',
        to: '/users',
      },
    ],
  }),

  created() {
    const token = Storage.getItem();
    if (token) {
      this.$store.commit(SET_TOKEN_TO_HEADERS, token);
    }
  },
  computed: {
    ...mapState({
      requesting: state => get(state, 'user.user.requesting'),
    }),
  },

  methods: {
    async logOut() {
      console.log('isLogOut?');
      await this.$store.dispatch('LogOut');
    },
  },
  mounted() {
    console.log('router', this.$router);
    console.log('route', this.$route);
  },
};
</script>

<style scoped>
.btn {
  margin-left: 80%;
}
</style>
