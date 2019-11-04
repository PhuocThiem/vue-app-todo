<template>
  <div class="container">
    <h1 class="" style="text-align: center">Login</h1>
    <form>
      <div class="form-group">
        <label>Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div class="form-group">
        <label class="label ml0">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <button class="btn btn-primary" @click="logIn()">Submit</button>
    </form>
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex';
import { get } from 'lodash';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapState({
      requesting: state => get(state, 'user.user.requesting'),
    }),
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
    }),
  },
  methods: {
    async logIn() {
      await this.$store.dispatch('LogIn', {
        email: this.user.username,
        password: this.user.password,
      });
      console.log('isAuthenticated', this.isAuthenticated);
      if (this.isAuthenticated) {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style scoped>
.container {
  height: 300px;
  width: 400px;
  margin-top: 100px;
  text-align: left;
}
</style>
