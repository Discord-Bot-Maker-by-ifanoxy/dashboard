import axios from 'axios'

const BASE_URL = 'http://localhost:1111/'

const getAccess = () => localStorage.getItem('access_token')

async function get(path: string) {
  return await axios.get(BASE_URL + path, {
    headers: {
      Authorization: `Bearer ${getAccess()}`
    }
  })
}

async function post(path: string, data: any) {
  return await axios.post(BASE_URL + path, data, {
    headers: {
      Authorization: `Bearer ${getAccess()}`
    }
  })
}

export const API = {
  async check() {
    return get('check')
  },
  bot: {
    async create(name: string, image: string) {
      return post('bot/create', { name, image })
    },
    async get(name?: string) {
      return get(`bot/get/${name ?? 'all'}`)
    }
  },
  modules: {
    async get(name?: string) {
      return get(`modules/get/${name ?? ''}`)
    }
  }
}
