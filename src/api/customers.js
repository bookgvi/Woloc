import api from './instance'

const API_URL = process.env.API_CABINET_URL
export default {
  getAll: async (page) => {
    try {
      const r = await api.get(`${API_URL}/customers`, {
        params: { page }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: customers :: getAll', e)
    }
  },
  getSearchedCustomers: async (payload) => {
    try {
      const result = await api.post(`${API_URL}/customers`, payload)
      return result
    } catch (e) {
      console.warn('catch :: customers :: getSearchedUsers', e)
    }
  }
}
