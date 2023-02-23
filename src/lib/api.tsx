import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://us-central1-suporteweb-fbf71.cloudfunctions.net/app',
  timeout: 30000,
})