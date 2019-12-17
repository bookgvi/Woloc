import api from './instance'

const API_URL = process.env.API_CABINET_URL
export default {
  getAll: async (page, filter) => {
    try {
      const r = await api.get(`${API_URL}/refunds`, {
        params: { page,
          ...filter
        }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: refunds :: getAll', e)
    }
  },
  confirm: async id => {
    try {
      const r = await api.post(`${API_URL}/refunds/confirm/${id}`)
      return r
    } catch (e) {
      console.warn('catch :: refunds :: confirm', e)
      return e
    }
  },
  cancel: async id => {
    try {
      const r = await api.post(`${API_URL}/refunds/cancel/${id}`)
      return r
    } catch (e) {
      console.warn('catch :: refunds :: cancel', e)
      return e
    }
  }
}
