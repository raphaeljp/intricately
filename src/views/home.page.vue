<template>
  <div id="page">
    <transition name="fade">
      <ErrorAlert v-if="alertStatus" />
    </transition>

    <Loader v-if="loaderStatus" />

    <Header />

    <router-view class="router__page" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Loader from '@/components/loader.component.vue';
import Header from '@/components/header.component.vue';
import ErrorAlert from '@/components/error-alert.component.vue';

@Component({
  components: {
    ErrorAlert,
    Loader,
    Header,
  },
})
export default class Home extends Vue {
  get alertStatus() {
    return this.$store.state.errorAlert.active;
  }

  get loaderStatus() {
    return this.$store.state.loader;
  }
}
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
