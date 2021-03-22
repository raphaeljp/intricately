<template>
  <div id="loader__component">
    <div id="loader__backdrop"></div>
    <div id="loader__icon">
      <img :src="require('@/assets/icons/loading.gif')" alt="loading..." />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Loader extends Vue {}
</script>

<style lang="scss" scoped>
  #loader__component {
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    right: 0;
    position: absolute;
    top: 0;
    width: 100vw;
    z-index: 999;

    #loader__backdrop {
      background: rgba(0, 0, 0, 0.4);
      height: 100%;
      width: 100%;
    }

    #loader__icon {
      position: absolute;

      img {
        height: 100px;
        width: 100px;
      }
    }
  }
</style>
