import { ICard } from '@/models/card.model';

const availableCards: string[] = ['2', 'A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3'];
const availableSuits: string[] = ['H', 'D', 'C', 'S'];

const parseCardValue = (value: string): string => {
  switch (value) {
    case 'ACE': return 'A';
    case 'KING': return 'K';
    case 'QUEEN': return 'Q';
    case 'JACK': return 'J';
    default: return value;
  }
};

const parseCardSuit = (value: string): string => {
  switch (value) {
    case 'HEARTS': return 'H';
    case 'CLUBS': return 'C';
    case 'SPADES': return 'S';
    case 'DIAMONDS': return 'D';
    default: return value;
  }
};

const validateCard = (card: string): boolean => {
  if (card.replace(' ', '').length < 2) return false;

  const [value, suit] = card.length < 3
    ? card.split('')
    : [card.substring(0, 2), card.substring(2)];

  const isValueValid = availableCards.filter((c) => c === value.toUpperCase()).length > 0;
  const isSuitValid = availableSuits.filter((s) => s === suit.toUpperCase()).length > 0;

  return isValueValid && isSuitValid;
};

const ordinateCardsArray = (value: string): string[] => {
  const cardIndex = availableCards.indexOf(parseCardValue(value));

  const strongCardsArray = availableCards.slice(cardIndex, availableCards.length);
  const weakCardsArray = availableCards.slice(0, (availableCards.length - strongCardsArray.length));

  return [...strongCardsArray, ...weakCardsArray];
};

const ordinateSuitsArray = (suit: string): string[] => {
  const suitIndex = availableSuits.indexOf(suit);

  const strongSuitsArray = availableSuits.slice(suitIndex, availableSuits.length);
  const weakSuitsArray = availableSuits.slice(0, (availableSuits.length - strongSuitsArray.length));

  return [...strongSuitsArray, ...weakSuitsArray];
};

const ordinatePlaybook = (cards: ICard[], rotation: ICard) => {
  const { value: rotationValue, suit: rotationSuit } = rotation;
  const ordinatedCards = ordinateCardsArray(rotationValue);
  const ordinatedSuits = ordinateSuitsArray(parseCardSuit(rotationSuit));

  const cardsGroupedBySuit: ICard[][] = [];
  ordinatedSuits.forEach((s: string) => {
    cardsGroupedBySuit.push(cards.filter((c) => parseCardSuit(c.suit) === s));
  });

  const ordinatedHand = cardsGroupedBySuit.map((group: ICard[]) => {
    const cardsInHand: ICard[] = [];
    ordinatedCards.forEach((value: string) => {
      const test = group.filter((c: ICard) => parseCardValue(c.value) === value);
      if (test.length > 0) cardsInHand.push(test[0]);
    });
    return cardsInHand;
  });
  return ordinatedHand.flat();
};

const findPair = (cards: ICard[]): string[][] => {
  const pairs: string[][] = [];
  for (let i = 0; i < cards.length - 1; i += 1) {
    for (let j = i + 1; j < cards.length; j += 1) {
      if (cards[i].value === cards[j].value) {
        pairs.push([cards[i].code, cards[j].code]);
      }
    }
  }
  return pairs;
};

const findThreeOfAKind = (cards: ICard[]): string[][] => {
  let slicedArray = [...cards].splice(1, cards.length);
  const triplets: string[][] = [];
  for (let i = 0; i < cards.length - 2; i += 1) {
    const pairs = findPair(slicedArray);
    pairs.map((group) => triplets.push([cards[i].code, ...group.flat()]));
    slicedArray = slicedArray.splice(1, slicedArray.length);
  }
  return triplets;
};

const findFullHouseGroups = (cards: ICard[]): ICard[][] => {
  let myCard: ICard;
  let storedCard: ICard;

  return cards
    .sort((a: ICard, b: ICard) => (a.value > b.value ? 1 : -1))
    .map((card: ICard) => {
      myCard = card;
      if (myCard.value !== (storedCard ? storedCard.value : storedCard)) {
        storedCard = myCard;
        return [...cards
          .filter((filterCard) => filterCard.value === myCard.value)];
      }
      return [];
    })
    .filter((groups) => groups && groups.length >= 2);
};

const getFullHousePossibilities = (orderedCards: ICard[]): string[] => {
  const fullHouseCombinations: string[] = [];
  const groups = findFullHouseGroups(orderedCards);
  let ThreeOfAKind = [];
  let pair = [];
  for (let i = 0; i < groups.length; i += 1) {
    ThreeOfAKind.push(findThreeOfAKind(groups[i]));
    pair.push(findPair(groups[i]));
  }

  ThreeOfAKind = ThreeOfAKind.flat();
  pair = pair.flat();

  for (let i = 0; i < ThreeOfAKind.length; i += 1) {
    for (let j = 0; j < pair.length; j += 1) {
      if (ThreeOfAKind[i][0].substring(0, 1) !== pair[j][0].substring(0, 1)) {
        fullHouseCombinations.push([...ThreeOfAKind[i], ...pair[j]].flat().join(', '));
      }
    }
  }
  return fullHouseCombinations;
};

export {
  parseCardValue,
  validateCard,
  ordinatePlaybook,
  getFullHousePossibilities,
};
