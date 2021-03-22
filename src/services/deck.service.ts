import store from '@/store/index';
import { AxiosResponse } from 'axios';
import { IDeck } from '@/models/deck.model';
import { IPlaybook } from '@/models/pile.model';
import http from './http-commons';

export default class DeckService {
  public createDeck(cards: string): Promise<IDeck> {
    return http.get(`/new/shuffle/?cards=${cards}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error('>>> Error trying to creat a deck: ', err);
        store.dispatch('toggleAlert', err.response.msg);
      });
  }

  public drawDeckCards(deckId: string, qty: string): Promise<AxiosResponse> {
    return http.get(`/${deckId}/draw/?count=${qty}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error('>>> Error trying to draw cards: ', err);
        store.dispatch('toggleAlert', err.response.msg);
      });
  }

  public createPile(deckId: string, pileName: string, cards: string): Promise<AxiosResponse> {
    return http.get(`/${deckId}/pile/${pileName}/add/?cards=${cards}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error('>>> Error trying to create a pile: ', err);
        store.dispatch('toggleAlert', err.response.msg);
      });
  }

  public listCardsOnPile(deckId: string, pileName: string): Promise<IPlaybook> {
    return http.get(`/${deckId}/pile/${pileName}/list/`)
      .then((res) => res.data)
      .catch((err) => {
        console.error('>>> Error trying to list cards: ', err);
        store.dispatch('toggleAlert', err.response.msg);
      });
  }
}

export const deckService = new DeckService();
