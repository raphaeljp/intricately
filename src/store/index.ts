import Vue from 'vue';
import Vuex from 'vuex';

import { deckService } from '@/services/deck.service';
import { getFullHousePossibilities, ordinatePlaybook } from '@/helpers/card.helper';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    deck: {},
    rotation: '',
    playbook: {},
    fullHouses: [],
    loader: false,
    errorAlert: {
      active: false,
      msg: '<p>test</p>',
    },
  },
  mutations: {
    setDeck(state, payload) {
      state.deck = payload;
    },
    setRotation(state, payload) {
      state.rotation = payload;
    },
    setPlaybook(state, payload) {
      state.playbook = payload;
    },
    setFullHouses(state, payload) {
      state.fullHouses = payload;
    },
    toggleLoader(state) {
      state.loader = !state.loader;
    },
    activateAlert(state, payload) {
      state.errorAlert.active = true;
      state.errorAlert.msg = payload;
    },
    deactivateAlert(state) {
      state.errorAlert.active = false;
      state.errorAlert.msg = '';
    },
  },
  actions: {
    async createDeck({ commit }, payload) {
      const encodedParams = encodeURIComponent(payload.cards.join());
      const newDeck = await deckService.createDeck(encodedParams);

      commit('setDeck', newDeck);
    },
    async createPiles({}, payload) {
      const { deckId, cards, rotation } = payload;
      const encodedParams = encodeURIComponent(cards.join());

      await deckService.drawDeckCards(deckId, cards.length + 1);
      await deckService.createPile(deckId, 'playbook', encodedParams);
      await deckService.createPile(deckId, 'rotation', rotation);
    },
    async listCards({ commit }, payload) {
      const deckId = payload;
      const listPlaybook = await deckService.listCardsOnPile(deckId, 'playbook');
      const listRotation = await deckService.listCardsOnPile(deckId, 'rotation');

      const rotation = listRotation.piles.rotation.cards[0];

      if (rotation.code.substring(0, 1) === '0') {
        rotation.code = `10${rotation.code.substring(rotation.code.length - 1)}`;
      }

      const ordinatedPlaybook = await ordinatePlaybook(
        listPlaybook.piles.playbook.cards,
        rotation,
      );

      commit('setPlaybook', ordinatedPlaybook);
      commit('setRotation', listRotation.piles.rotation.cards[0]);
    },
    async generateFullHouses({ commit }, payload) {
      const { hand, rotation } = payload;
      const fullHouseCombo = await getFullHousePossibilities([...hand, rotation]);

      commit('setFullHouses', fullHouseCombo);
    },
    toggleAlert({ commit }, payload) {
      if (this.state.loader) commit('toggleLoader');

      commit('activateAlert', payload);
      setTimeout(() => commit('deactivateAlert'), 4000);
    },
  },
});
