import api from './instance'
const API_URL = process.env.API_CABINET_URL

export default {
  getAll: async (id, page, filter) => {
    console.log(...filter)
    try {
      const r = await api.get(`${API_URL}/rooms/discounts`, {
        params: {
          page,
          ...filter
        }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: discounts :: getAll', e)
    }
  }
}
