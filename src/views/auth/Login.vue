<template>
  <form @submit.prevent="login" class="auth-form">
    <div>
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model="email"
        :disabled="false"
        required
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

    <button type="submit" class="btn primary-btn">
      <span v-if="!loading"> Login </span>
      <span class="loader" v-else> loading </span>
    </button>

    <div class="login-action">
      <div class="links">
        <a href="#">Forgot Password</a>
      </div>

      <div class="or">
        <hr class="line" />
        <span>OR</span>
        <hr class="line" />
      </div>

      <router-link to="/auth/register" tag="button" class="btn outline-btn"
        >Create an Account</router-link
      >
    </div>
  </form>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async login() {
      const { email, password } = this;
      this.loading = true;

      const res = await this.$store.dispatch("auth/login", {
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
        query: { token: JSON.parse(localStorage.getItem("token")).value },
      });
    },
  },
};
</script>

<style scoped>
.login-action {
  width: 60%;
  margin: auto;
  padding-top: 4.2rem;
}

.links a {
  display: block;
  color: #fff;
  text-decoration: none;
  text-align: center;
  font-size: 1.6rem;
}

.or {
  display: flex;
  flex-direction: row;
  margin-bottom: 1.2rem;
  align-items: center;
}

.or .line {
  flex: auto;
  border: none;
  height: 1px;
  background: #aaa;
}

.or span {
  color: #ccc;
  padding: 0 1.2rem;
}
</style>
