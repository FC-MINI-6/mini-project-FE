import axios from 'axios'

const host = window.location.hostname === 'localhost' ? import.meta.env.VITE_BASE_URL : 'api'

export const client = axios.create({
  baseURL: host,
  headers: {
    'Content-Type': 'application/json'
  }
})
