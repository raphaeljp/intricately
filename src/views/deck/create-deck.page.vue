<template>
  <div id="new-deck__page">
    <form id="deck-of-cards__form" @submit.prevent.stop="">
      <div id="form__inputs">
        <CardInput v-for="(n, i) in 10" :key="i" :id="i" v-model="cards[i]" />
      </div>

      <div id="rotation__card">
        <CardInput
          :id="'rotation'"
          v-model="rotationCard"
          hide-label
          no-margin
        />
      </div>

      <div id="form__button">
        <button>Submit</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CardInput from '@/components/card-input.component.vue';

@Component({
  components: {
    CardInput,
  },
})
export default class NewDeck extends Vue {
  private cards: string[] = [];

  private rotationCard = '';
}
</script>

<style lang="scss" scoped>
#new-deck__page {
  display: flex;
  flex-grow: 1;

  form {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 100%;

    #form__inputs {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 2rem;
    }

    #rotation__card {
      align-items: center;
      display: flex;
      justify-content: center;
      margin-top: 4rem;
      position: relative;
      width: 100%;

      ::v-deep .card-input__box {
        &::before {
          content: 'Rotation Card';
          font-size: 1.5rem;
          font-weight: 700;
          left: -12rem;
          letter-spacing: 0.1rem;
          position: absolute;
          top: calc(50% - 0.75rem);
        }
      }
    }

    #form__button {
      margin: auto 0 4rem;
      text-align: center;
      width: 100%;

      button {
        background: #1C0063;
        border: none;
        border-radius: 1.5rem;
        color: #E9D20A;
        font-size: 2rem;
        padding: 0.5rem 3rem;
      }
    }
  }
}
</style>
