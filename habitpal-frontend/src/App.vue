<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
html,
body {
    width: 100%;
    height: 100%;
    /*  Dynamic text sizing */
    font-size: min(max(12px, 1.3vw), 22px);
}

body {
    background-image: url("assets/wallpaper.jpg");
    background-size: cover;
}

@font-face {
  font-family: MerriweatherSans Variable;
  src: url('./assets/MerriweatherSans-VariableFont_wght.ttf');
}

#app {
  font-family: MerriweatherSans Variable;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

::placeholder {
    font-size: 1.25vw;
    color: rgb(144 148 169);
    font-variation-settings: 'wght' 100;
}

input:focus::placeholder {
    color: rgb(190 195 206);
}
</style>
