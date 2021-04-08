<template>
  <section class="wrapper-layout">
    <div class="auth-layout">
      <div class="form-layout">
        <div class="logo">
          <img
            src="../../assets/images/logo.svg"
            alt="Travel Afrique logo"
            class=""
          />
        </div>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>

    <div class="banner">
      <div class="showcase-content">
        <h1 class="showcase-text">Tailor-made trips to Africa</h1>
        <p>
          Go on a tour, experience an adventure or just enjoy a holiday on the
          beach.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wrapper-layout {
  display: flex;
  background: #263542;
  color: #fff;
  overflow: hidden;
}

.auth-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100vh;
}

.form-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80% !important;
  padding-bottom: 3.6rem;
}

.form-layout .logo {
  margin-bottom: 8vh;
}

.logo img {
  width: 30rem;
}

.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-image: linear-gradient(
      rgba(70, 151, 161, 0.4),
      rgba(70, 151, 161, 0.4)
    ),
    url("../../assets/images/img3.jpg");
  background-position: bottom;
  background-size: cover;
  height: 100vh;
  text-align: center;
}

.banner h1 {
  font-size: 3.2rem;
  width: 100%;
  color: #fff;
  margin-bottom: 1rem;
}

.banner p {
  font-size: 2rem;
  width: 80%;
  margin: auto;
  text-align: center;
  color: #fff;
  margin-bottom: 1.5rem;
}

/* Media Queries */
@media (min-width: 1200px) {
  #left {
    flex: 4;
  }

  #right {
    flex: 6;
  }
}

@media (max-width: 768px) {
  wrapper-layout {
    overflow: auto;
  }

  .banner {
    display: none;
  }

  .auth-layout {
    justify-content: start;
    margin-top: 4vh;
  }

  .form-layout .logo {
    margin-bottom: 2vh;
  }
}
</style>
