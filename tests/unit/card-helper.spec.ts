import {
  parseCardValue,
  validateCard,
  ordinatePlaybook,
  getFullHousePossibilities,
} from '@/helpers/card.helper';

import { ICard } from '@/models/card.model';

const handMock: ICard[] = [
  {
    code: 'AS',
    suit: 'SPADES',
    value: 'ACE',
  },
  {
    code: 'AD',
    suit: 'DIAMONDS',
    value: 'ACE',
  },
  {
    code: 'AC',
    suit: 'CLUBS',
    value: 'ACE',
  },
  {
    code: 'KH',
    suit: 'HEARTS',
    value: 'KING',
  },
  {
    code: 'KS',
    suit: 'SPADES',
    value: 'KING',
  },
];

const rotationMock: ICard = {
  code: '2H',
  suit: 'HEARTS',
  value: '2',
};

describe('Card Helper', () => {
  it('should return parsed value for letter cards', () => {
    const parsedCard = parseCardValue('ACE');

    expect(parsedCard).toBe('A');
  });

  it('should return false if card is invalid', () => {
    expect(validateCard('1X')).toBe(false);
  });

  it('should return true if card is valid', () => {
    expect(validateCard('2S')).toBe(true);
  });

  it('should return ordinated playbook', () => {
    const ordinatedPlaybook = ordinatePlaybook(handMock, rotationMock);
    const mapPlaybookValues = ordinatedPlaybook.map((card) => card.code).join(',');
    const expectedResult = 'KH,AD,AC,AS,KS';

    expect(mapPlaybookValues).toMatch(expectedResult);
  });

  it('should return full house options', () => {
    const fullDeck = [...handMock, rotationMock];
    const fullHouseOptions = getFullHousePossibilities(fullDeck);

    expect(fullHouseOptions).toHaveLength(1);
  });
});
