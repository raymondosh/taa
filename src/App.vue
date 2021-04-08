<template>
  <main id="app">
    <notifications />
    <transition name="page" mode="out-in">
      <router-view />
    </transition>
  </main>
</template>

<style>
html {
  font-size: 62.5%;
  box-sizing: inherit;
}
*::before,
*::after,
* {
  padding: 0;
  margin: 0;
  box-sizing: inherit;
}
body {
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.7;
}

@import "./assets/css/utilities.css";
</style>
