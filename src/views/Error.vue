<template>
  <section class="hero">
    <div>
      <h1>You have lost your way</h1>

      <router-link to="/" tag="button">Find your wa back</router-link>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: "error",
};
</script>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  padding: 0 20px;
  background-image: linear-gradient(
      rgba(10, 70, 78, 0.8),
      rgba(20, 122, 136, 0.8)
    ),
    url("../assets/images/img3.jpg");
  background-position: bottom;
  background-size: cover;
  height: 100vh;
  width: 100%;
}

.hero h1 {
  font-size: 4.8rem;
}

.hero button {
  width: 100%;
  background: #147b88;
  padding: 1.2rem 1.6rem;
  font-size: 1.6rem;
  border: 0;
  margin-top: 2.4rem;
  color: #fff;
  cursor: pointer;
}

.hero button:hover {
  background: rgba(20, 122, 136, 0.836);
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 4rem;
    line-height: 3.5rem;
  }
}
</style>
