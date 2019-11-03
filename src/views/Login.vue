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
      <button class="btn btn-primary" @click="logIn">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    async logIn() {
      await this.$store.dispatch('LogIn', {
        email: this.user.username,
        password: this.user.password,
      });
      this.$router.push('/');
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
