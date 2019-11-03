<template>
  <v-app >
    <v-app-bar clipped-left app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Todo</v-toolbar-title>
      <div class="mb-10">
        <v-btn color="success" fab small dark position: absolute right @click="logOut">
          <v-icon>mdi-account-convert</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer clipped v-model="drawer" app color="indigo accent-1">
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
  </v-app>
</template>

<script>
// import { store } from 'vuex';
import { mapGetters, mapState } from 'vuex';
import { get } from 'lodash';

export default {
  name: 'App',
  components: {},
  data: () => ({
    drawer: null,
    menu: [
      {
        name: 'Home',
        icon: 'mdi-home',
        to: '/home',
      },
      {
        name: 'Users',
        icon: 'mdi-account-plus-outline',
        to: '/users',
      },
    ],
  }),
  computed: {
    ...mapState({
      requesting: state => get(state, 'user.user.requesting'),
    }),
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      authStatus: 'authStatus',
    }),
    methods: {
      async logOut() {
        await this.$store.dispatch('Logout');
        this.$router.push('/login');
      },
    },
  },
};
</script>

<style scoped>
.btn {
  margin-left: 80%;
}
</style>
