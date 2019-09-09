import api from './instance'

export default {
  getAll: async (page) => {
    try {
      const r = await api.get('bookings', {
        params: { page, studio: 250 }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: refunds :: getAll', e)
    }
  },
  getForCalendar: async (payload) => {
    const { studio, dateFrom, dateTo } = payload
    try {
      const r = await api.get(`calendar/?studio=${studio}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
      return r.data
    } catch (e) {
      console.warn('catch :: refunds :: getForCalendar', e)
    }
  }
}
