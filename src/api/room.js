import api from './instance'

const API_URL = process.env.API_CABINET_URL
export default {

  getOne: async (id) => {
    try {
      const r = await api.get(`${API_URL}/room/${id}`)
      return r.data.data
    } catch (e) {
      console.warn('catch :: room :: getSingleRoom', e)
    }
  }
}
