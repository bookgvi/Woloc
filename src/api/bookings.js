import api from './instance'

const API_URL = process.env.API_CABINET_URL
export default {
  getAll: async (page, filter) => {
    try {
      const r = await api.get(`${API_URL}/bookings`, {
        params: {
          page,
          ...filter
        }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: getAll', e)
    }
  },

  getOne: async (payload) => {
    const { id } = payload
    try {
      const r = await api.get(`${API_URL}/bookings/${id}`)
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: getOne', e)
    }
  },

  getForCalendar: async (filter) => {
    try {
      const r = await api.get(`${API_URL}/calendar`, {
        params: filter
      })
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: getForCalendar', e)
    }
  },
}
