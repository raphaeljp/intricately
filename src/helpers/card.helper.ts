const availableCards: string[] = ['2', 'A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3'];
const availableSuits: string[] = ['H', 'D', 'C', 'S'];

const validateCard = (card: string): boolean => {
  if (card.replace(' ', '').length < 2) return false;

  const [value, suit] = card.length < 3
    ? card.split('')
    : [card.substring(0, 2), card.substring(2)];

  const isValueValid = availableCards.filter((c) => c === value.toUpperCase()).length > 0;
  const isSuitValid = availableSuits.filter((s) => s === suit.toUpperCase()).length > 0;

  return isValueValid && isSuitValid;
};

export default validateCard;
