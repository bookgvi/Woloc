import api from './instance'

export default {
  getAll: async (page) => {
    try {
      const r = await api.get('bookings', {
        params: { page, studio: 250 }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: getAll', e)
    }
  },

  getForCalendar: async (payload) => {
    const { studio, dateFrom, dateTo } = payload
    try {
      const r = await api.get(`calendar`, {
        params: { studio, dateFrom, dateTo }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: getForCalendar', e)
    }
  }
}
