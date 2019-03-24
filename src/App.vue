<template>
  <div id="app">
    <Tradutor msg="Welcome to Your Translations in Vue.js App"/>
  </div>
</template>

<script>

  import Tradutor from "./components/Tradutor";

  export default {
    name: 'app',
    components: {
      Tradutor
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
  }
</style>
