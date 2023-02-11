import axios from 'axios'

export function getFormData() {
  return axios.get(`https://mocki.io/v1/d15ecbc8-efaf-409a-b122-da4b12bd8b18`)
}