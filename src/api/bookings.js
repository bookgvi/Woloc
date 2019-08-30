import api from './instance'

export default {
  getAll: async () => {
    const params = {
      studio: '100',
      dateFrom: '20190501',
      dateTo: '20200101'
    }

    try {
      const r = await api.get('bookings', { params })
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
