<template>
  <div id="app">
    <router-view />
    <div id="wallpaper"></div>
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
    background-color: #1a2c50;
}
@font-face {
  font-family: MerriweatherSans Variable;
  src: url('./assets/MerriweatherSans-VariableFont_wght.ttf');
}

@font-face {
  font-family: DancingScript Variable;
  src: url('./assets/DancingScript-VariableFont_wght.ttf');
}
#app {
  font-family: MerriweatherSans Variable;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
    font-family: DancingScript Variable;
    color: floralwhite;
    font-size: max(4vw, 40px);
    font-variation-settings: 'wght' 700;
}

input, textarea {
  color: #1c1e21;
  font-variation-settings: 'wght' 100;
}
::placeholder {
    font-size: 1.25vw;
    color: rgb(144 148 169);
    font-variation-settings: 'wght' 100;
}

input:focus::placeholder, textarea:focus::placeholder {
    color: rgb(190 195 206);
}

</style>
