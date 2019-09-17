import api from './instance'

const API_URL = process.env.API_CABINET_URL
export default {
  getAll: async (page, filter) => {
    try {
      console.log({ filter })

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

  getForCalendar: async (payload) => {
    const { studio, dateFrom, dateTo } = payload
    try {
      const r = await api.get(`${API_URL}/calendar`, {
        params: { studio, dateFrom, dateTo }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: getForCalendar', e)
    }
  }
}
