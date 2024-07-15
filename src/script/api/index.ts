import axios from 'axios'

const BASE_URL = 'http://154.51.39.69:20017/'

const getAccess = () => localStorage.getItem('access_token')

async function get(path: string, config = null) {
  return await axios.get(BASE_URL + path, {
    headers: {
      Authorization: `Bearer ${getAccess()}`
    },
    ...config
  })
}
async function put(path: string, data: any) {
  return await axios.put(BASE_URL + path, data, {
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
  async stats() {
    return get('stats')
  },
  async exportBot(bot_name: string, database = {}, bot_token) {
    return get(
      `export?` +
        new URLSearchParams({
          bot_name,
          bot_token,
          database_name: database.name,
          database_port: database.port,
          database_host: database.host,
          database_username: database.username,
          database_password: database.password
        }),
      {
        responseType: 'blob'
      }
    )
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
    async get(module_id?: string, bot_name: string) {
      return get(
        `modules/get${module_id ? '/' + module_id : ''}${bot_name ? `?bot_name=${bot_name}` : ''}`
      )
    },
    async getAllOfBot(bot_name: string) {
      return get(`modules/get?bot_name=${bot_name}&only_downloaded=true`)
    },
    async add(module_id: number, bot_name: string) {
      return put(`modules/add/${module_id}`, { bot_name: bot_name })
    },
    async remove(module_id: number, bot_name: string) {
      return put(`modules/remove/${module_id}`, { bot_name: bot_name })
    },
    favorite: {
      async add(module_id: number, bot_name: string) {
        return put(`modules/favorite/add/${module_id}`, { bot_name: bot_name })
      },
      async remove(module_id: number, bot_name: string) {
        return put(`modules/favorite/remove/${module_id}`, { bot_name: bot_name })
      }
    },
    slash_commands: {
      async get(bot_name: string, module_id: number, command_name?: string) {
        return get(
          `modules/config/slashcommands/get/${module_id}?bot_name=${bot_name ?? 'null'}${command_name ? `&command_name=${command_name}` : ''}`
        )
      },
      async update(bot_name: string, module_id: number, data) {
        return put(`modules/config/slashcommands/update/${module_id}`, {
          ...data,
          bot_name: bot_name
        })
      }
    },
    presence: {
      async get(bot_name: string, module_id: number, command_name?: string) {
        return get(
          `modules/config/presence/get/${module_id}?bot_name=${bot_name ?? 'null'}${command_name ? `&command_name=${command_name}` : ''}`
        )
      },
      async update(bot_name: string, module_id: number, data) {
        return put(`modules/config/presence/update/${module_id}`, {
          ...data,
          bot_name: bot_name
        })
      }
    }
  }
}
