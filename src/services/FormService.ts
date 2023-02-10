import axios, { AxiosResponse } from 'axios'
import { FormType } from "../models/generalForm";

export async function getFormData(): Promise<AxiosResponse<Promise<FormType>>> {
  return axios.get<Promise<FormType>>(`https://mocki.io/v1/d15ecbc8-efaf-409a-b122-da4b12bd8b18`)
}