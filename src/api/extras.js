import api from './instance'
// import extras from 'src/mocks/extras'

const API_URL = process.env.API_CABINET_URL

export default {
  getAll: async (page, filter) => {
    try {
      const r = await api.get(`${API_URL}/settings/extras`, {
        params: {
          page,
          ...filter
        }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: extras :: getForSettings', e)
      return e
    }
  },
  getForCalendar: async (payload) => {
    try {
      const r = await api.get(`${API_URL}/rooms/${payload.room}/extras`)
      return r.data
    } catch (e) {
      console.warn('catch :: extras :: getForCalendar', e)
    }
  },
}
