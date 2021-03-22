<template>
  <div id="page">
    <Header />
    <router-view class="router__page" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/header.component.vue';

@Component({
  components: { Header },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
#page {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;

  .router__page {
    height: 100%;
    max-width: 75rem;
    width: 100%;
  }
}
</style>
