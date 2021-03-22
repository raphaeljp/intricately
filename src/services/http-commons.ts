import axios from 'axios';

export default axios.create({
  baseURL: 'https://deckofcardsapi.com/api/deck',
  headers: {
    'Content-type': 'application/json',
  },
});
