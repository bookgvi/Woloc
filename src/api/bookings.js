import api from './instance'

export default {

  getForCalendar: async (payload) => {
    const { studio, dateFrom, dateTo } = payload
    try {
      const r = await api.get(`calendar/?studio=${studio}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
      return r.data
    } catch (e) {
      console.warn('catch :: bookings :: getForCalendar', e)
    }
  }
}
