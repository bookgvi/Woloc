import api from './instance'
import { ApiObject } from './abstractAPI'
const API_URL = process.env.API_CABINET_URL
// eslint-disable-next-line
const finances = new ApiObject(`${API_URL}/finances`)
export default {
  finances,
  withdraw: async _ => {
    try {
      await api.post(`${API_URL}/finances/withdrawal`)
    } catch (e) {
      console.warn('catch :: finances :: withdraw', e.message)
    }
  },
  dashboardFinances: async (payload) => {
    const { date } = payload
    try {
      const r = await api.get(`${API_URL}/dashboard/finances`, {
        params: {
          date
        }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: finances :: dashboard/finances', e)
    }
  }
}
