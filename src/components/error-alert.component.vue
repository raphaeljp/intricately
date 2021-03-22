<template>
  <div id="error-alert__container">
    <img :src="require('@/assets/icons/error-icon.png')" alt="error">
    <div id="error-alert__text" v-html="alertInfo.msg"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ErrorAlert extends Vue {
  get alertInfo() {
    return this.$store.state.errorAlert;
  }
}
</script>

<style lang="scss" scoped>
  #error-alert__container {
    align-items: center;
    background: #FFFFFF;
    border-bottom: solid 1px red;
    box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 1px;
    display: flex;
    justify-content: flex-start;
    padding: 1.25rem 0;
    position: fixed;
    width: 100vw;

     img {
       height: 2rem;
       margin-left: 3rem;
       width: 2rem;
     }

    #error-alert__text {
      color: gray;
      font-size: 1rem;
      text-align: center;
      width: 100%;
    }
  }
</style>
