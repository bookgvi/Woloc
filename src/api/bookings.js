import api from './instance'

export default {
  getAll: async () => {
    try {
      const r = await api.get(`bookings`)
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: getAll', e)
    }
  },

  getForTime: async (payload) => {
    const { studio, dateFrom, dateTo } = payload
    try {
      const r = await api.get(`bookings?studio=${studio}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: getForTime', e)
    }
  }
}
