<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'getBackground'
      ])
    }
  }
</script>

<style lang="scss">
  @import '@/scss/colors.scss';
  @font-face {
    font-family: regular;
    src: url('./assets/fonts/Jost-Regular.ttf');
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    color: $white1;
    font-family: regular;
    -webkit-tap-highlight-color: transparent;
  }

  .container{
    @media screen and (min-width:1100px) {
      max-width: 1100px;
      margin: 0 auto;
    }
    @media screen and (min-width:1440px) {
      max-width: 1300px;
      margin: 0 auto;
    }
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-size: 10px;
    background-color: $dark2;
  }

  .main {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>