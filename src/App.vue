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
    @media (min-width: 1025px) and (max-width: 1440px) {
      font-size: 9px;
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      font-size: 8px;
    }

    @media (min-width: 481px) and (max-width: 768px) {
      font-size: 7px;
    }

    @media (max-width: 480px) {
      font-size: 6px;
    }
  }

  .main {
    position: relative;
    width: 100%;
    height: 100%;

    .bg-image {
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background-image: url('./assets/img/default-background.jpg');
      background-size: cover;
      z-index: -2;
      background-position: 50% 0;
      -webkit-filter: blur(5px);
      filter: blur(5px);
      transform: scale(1.1);
      -moz-transition: all .3s;
      -o-transition: all .3s;
      -webkit-transition: all .3s;
      transition: all .3s;
      &::after{
        content: '';
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index:-1;
        background: #222;
        opacity: .9;
      }
    }
  }
</style>