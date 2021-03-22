<template>
  <div class="header__container">
    <p>{{ $route.meta.name }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
.header__container {
  padding: 40px 0;
  width: 100vw;
  background: #268701;
  background: -moz-linear-gradient(left,  #268701 0%, #1c6b01 100%);
  background: -webkit-linear-gradient(left,  #268701 0%,#1c6b01 100%);
  background: linear-gradient(to right,  #268701 0%,#1c6b01 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr='#268701',
      endColorstr='#1c6b01',
      GradientType=1
  );

  p {
    color: #FBE500;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
  }
}
</style>
