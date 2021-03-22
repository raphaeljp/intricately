<template>
  <div id="deck-card__container">
    <div class="deck-card__info" v-for="n in 2" :key="n">
      <span>{{ cardValue }}</span>
      <img :src="require(`@/assets/icons/${cardIcon}.png`)" :alt="cardIcon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { parseCardValue } from '@/helpers/card.helper';

import { ICard } from '@/models/card.model';

@Component({})
export default class DeckCard extends Vue {
  @Prop({ required: true }) private card!: ICard;

  get cardValue(): string {
    return parseCardValue(this.card.value);
  }

  get cardIcon(): string {
    return this.card.suit.toLowerCase();
  }
}
</script>

<style lang="scss" scoped>
  #deck-card__container {
    background: #FFFFFF;
    box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 10px;
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 16rem;
    padding: 0.5rem 1rem;
    width: 100%;

    .deck-card__info {
      align-items: flex-start;
      display: flex;

      span {
        font-size: 1.8rem;
        font-weight: 600;
      }

      img {
        height: 1.8rem;
        margin-left: 0.5rem;
      }

      &:nth-child(2) {
        transform: rotate(180deg);
      }
    }
  }
</style>
