import api from './instance'

const API_URL = process.env.API_CABINET_URL
export default {
  getAll: async () => {
    try {
      const r = await api.get(`${API_URL}/studios`)
      return r.data
    } catch (e) {
      console.warn('catch :: studios :: getAll', e)
    }
  }
}
