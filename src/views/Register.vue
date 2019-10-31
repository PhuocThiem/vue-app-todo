<template>
  <div class="container">
    <h1 class="" style="text-align: center; color: lightblue">Registration</h1>
    <form>
      <div class="form-group">
        <label>Email address</label>
        <input
          type="email"
          class="form-control"
          v-model="usename"
          placeholder="Enter email"
        />
      </div>
      <div class="form-group">
        <label class="label ml0">Password</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="btn btn-primary" @click="registerUser">Submit</button>
    </form>
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import { get } from 'lodash'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      requesting: state => get(state, 'register.register.requesting')
    }),
    ...mapGetters({
      register: 'register'
    })
  },
  methods: {
    registerUser (username, password) {
      this.$store.dispatch('postRegisterInfo', { username: this.username, password: this.password })
    }
  }
}
</script>

<style scoped>
.container {
  height: 300px;
  width: 400px;
  margin-top: 100px;
  text-align: left;
}
</style>
