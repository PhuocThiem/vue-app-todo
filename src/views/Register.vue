<template>
  <div class="container">
    <h1 class="" style="text-align: center; color: lightblue">Registration</h1>
    <form>
      <div class="form-group">
        <label>Email address</label>
        <input
          type="email"
          class="form-control"
          v-model="user.username"
          placeholder="Enter email"
        />
      </div>
      <div class="form-group">
        <label class="label ml0">Password</label>
        <input
          type="password"
          class="form-control"
          v-model="user.password"
          placeholder="Password"
          required
          autofocus
        />
      </div>
      <button class="btn btn-primary" @click.prevent="registerUser()">
        Register
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { get } from 'lodash';
// import { dictionary } from '../main'

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
      register: 'register',
    }),
  },
  methods: {
    async registerUser() {
      await this.$store.dispatch('Register', {
        email: this.user.username,
        password: this.user.password,
      });
      this.$router.push('/');
    },
  }
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
