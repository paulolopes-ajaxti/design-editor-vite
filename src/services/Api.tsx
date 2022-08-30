import axios from 'axios'

const Api = axios.create({
  /* baseURL: 'https://localhost:44326/api/v1/', */
  baseURL: 'https://localhost:44355/api/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export default Api