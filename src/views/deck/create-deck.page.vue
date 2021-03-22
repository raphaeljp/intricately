<template>
  <div id="new-deck__page">
    <form id="deck-of-cards__form" @submit.prevent.stop="checkCards()">
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
import { validateCard } from '@/helpers/card.helper';

@Component({
  components: {
    CardInput,
  },
})
export default class NewDeck extends Vue {
  private cards: string[] = [];

  private rotationCard = '';

  get deckInfo() {
    return this.$store.state.deck;
  }

  private checkCards() {
    const deck = [...this.cards, this.rotationCard];
    const invalidCards = deck.filter((card: string) => !validateCard(card)).length > 0;
    const InHand = this.cards.filter((card: string) => card === this.rotationCard).length > 0;

    if (this.cards.length === 0) {
      this.$store.dispatch(
        'toggleAlert',
        'Please insert the cards in the inputs below.',
      );

      return false;
    }

    if (!this.rotationCard) {
      this.$store.dispatch(
        'toggleAlert',
        'Please insert a rotation card.',
      );

      return false;
    }

    if (invalidCards) {
      this.$store.dispatch(
        'toggleAlert',
        'Looks like you\'ve included some invalid cards, please validate it before sending.',
      );

      return false;
    }

    if (InHand) {
      this.$store.dispatch(
        'toggleAlert',
        'The selected rotation card already is in your hand, please change it before submitting it.',
      );

      return false;
    }

    return this.publish();
  }

  private async publish() {
    await this.$store.commit('toggleLoader');
    await this.$store.dispatch('createDeck', {
      cards: this.parseTens([...this.cards, this.rotationCard]),
    });

    await this.$store.dispatch('createPiles', {
      deckId: this.deckInfo.deck_id,
      cards: this.parseTens(this.cards),
      rotation: this.parseTens(this.rotationCard),
    });

    await this.$store.commit('toggleLoader');

    return this.$router.push({
      name: 'DeckData',
      params: { deck_id: this.deckInfo.deck_id },
    });
  }

  private parseTens(cards: any) {
    let result = cards;

    if ((typeof cards === 'string')) {
      result = cards.substring(0, 2) === '10'
        ? `0${cards.substring(cards.length - 1)}`
        : cards;
    } else {
      const findTens = result.filter((card: string) => card.substring(0, 2) === '10');

      if (findTens.length > 0) {
        findTens.forEach((el: string) => {
          result[result.indexOf(el)] = `0${el.substring(el.length - 1)}`;
        });
      }
    }

    return result;
  }
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
