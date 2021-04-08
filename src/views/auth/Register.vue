<template>
  <form @submit.prevent="register" class="auth-form">
    <div>
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        required
        :disabled="false"
        v-model="email"
        class="text-input"
        placeholder="example@example.com"
      />
    </div>

    <div>
      <label for="password">Password</label>
      <input
        type="password"
        v-model="password"
        required
        :disabled="false"
        id="password"
        class="text-input"
        placeholder="*******"
      />
    </div>

    <div>
      <label for="password">Confirm Password</label>
      <input
        type="password"
        v-model="password2"
        :disabled="false"
        required
        id="password"
        class="text-input"
        placeholder="*******"
      />
    </div>

    <button
      :disabled="loading"
      :data-loading="loading"
      type="submit"
      class="btn primary-btn"
    >
      <span v-if="!loading"> Register </span>
      <span class="loader" v-else> loading </span>
    </button>

    <div class="is-registered">
      <small>Already Registered?</small>

      <router-link to="/auth/login" tag="button" class="btn outline-btn"
        >Login</router-link
      >
    </div>
  </form>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      password2: "",
      loading: false,
    };
  },
  methods: {
    async register() {
      const { email, password, password2 } = this;
      this.loading = true;
      if (password !== password2) {
        this.$notify({
          type: "error",
          title: "Passwords do not match!",
        });
        this.loading = false;
        return false;
      }
      const res = await this.$store.dispatch("auth/register", {
        email,
        password,
      });
      if (res.status === "error") {
        this.$notify({
          type: "error",
          title: res.message,
        });
        this.loading = false;
        return false;
      }
      this.loading = false;
      this.$notify({
        type: "success",
        title: res.message,
      });
      this.$router.push({
        name: "create-gallery",
        query: { token: localStorage.getItem("token").value },
      });
    },
  },
};
</script>

<style scoped>
.is-registered {
  width: 60%;
  margin: auto;
  padding-top: 4.2rem;
}

.is-registered small {
  display: block;
  margin-bottom: 0.6rem;
}
</style>
