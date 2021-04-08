<template>
  <section class="hero">
    <div>
      <h1>
        <span>Book tailor-made trips to Africa</span>
        <span>with local travel agencies</span>
      </h1>
      <p>
        Choose a destination, make your wish and our local partners will do the
        rest.
      </p>

      <router-link to="/create-gallery" tag="button"
        >Create your Own Gallery</router-link
      >
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
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

.hero h1 span {
  display: block;
}

.hero p {
  font-size: 1.8rem;
  margin-top: 3.2rem;
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

  .hero h1 span:nth-child(2) {
    margin-top: 2rem;
  }
}
</style>
