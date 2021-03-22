import { ICard } from '@/models/card.model';

export interface IPile {
  cards: ICard[]
}

export interface IPilesList {
  playbook: IPile,
  rotation: IPile,
}

export interface IPlaybook {
  success: boolean,
  'deck_id': string,
  remaining: string,
  piles: IPilesList,
}
