import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error?.response || error)
  },
)

export default client
