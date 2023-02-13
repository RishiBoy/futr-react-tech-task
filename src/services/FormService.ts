import axios from 'axios';

export async function getFormData() {
  return (await axios.get(`https://mocki.io/v1/d15ecbc8-efaf-409a-b122-da4b12bd8b18`)).data;
}
