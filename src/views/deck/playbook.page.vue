<template>
  <div id="deck-playbook__page">
    <div id="deck-playbook__box">
      <DeckCard v-for="(card, index) in playbook" :key="index" :card="card" />
    </div>

    <div id="deck-combinations__box">
      <p>
        <strong>High Card: </strong>
        <span>{{ highCard }}</span>
      </p>

      <div id="full-house__list">
        <strong>Full House Combo: </strong>
        <ul>
          <li v-if="fullHouses.length === 0">None</li>
          <li v-for="(fh, index) in fullHouses" :key="index">
            {{ fh }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DeckCard from '@/components/deck-card.component.vue';

@Component({
  components: {
    DeckCard,
  },
})
export default class DeckData extends Vue {
  get playbook() {
    return this.$store.state.playbook;
  }

  get rotationCard(): string {
    return this.$store.state.rotation?.code;
  }

  get highCard(): string {
    return this.$store.state.playbook[0]?.code;
  }

  get fullHouses(): string {
    return this.$store.state.fullHouses;
  }

  async beforeMount() {
    await this.$store.commit('toggleLoader');
    await this.$store.dispatch('listCards', this.$route.params.deck_id);
    await this.$store.dispatch('generateFullHouses', {
      hand: this.playbook,
      rotation: this.rotationCard,
    });
    await this.$store.commit('toggleLoader');
  }
}
</script>

<style lang="scss" scoped>
  #deck-playbook__page {
    align-items: center;
    display: flex;
    flex-direction: column;

    #deck-playbook__box {
      background: #D8D8D8;
      border: solid 2px #979797;
      display: grid;
      grid-gap: 20px calc((380px / 5));
      grid-template-columns: repeat(auto-fill, calc((100% / 5) - 61px));
      margin-top: 1rem;
      padding: 1rem 4rem;
      width: 100%;
    }

    #deck-combinations__box {
      margin-top: 2rem;
      max-width: 80%;
      width: 100%;

      p {
        font-size: 1.5rem;
        margin-bottom: 0.75rem;

        strong {
          font-weight: 700;
        }
      }

      #full-house__list {
        display: flex;
        font-size: 1.5rem;

        strong {
          font-weight: 700;
          margin-right: 1rem;
        }
      }
    }
  }
</style>
