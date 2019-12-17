import api from './instance'
import extrasMock from 'src/mocks/extras'

import { ApiObject } from './abstractAPI'
const API_URL = process.env.API_CABINET_URL
// eslint-disable-next-line
const extras = new ApiObject(`${API_URL}/settings/extras`)
export default {
  extras,
  getMock: async () => {
    try {
      const r = {
        data: extrasMock
      }
      return r.data
    } catch (e) {
      console.warn('catch :: extras :: getMock', e)
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
  updateExtra: async (id, updateInfo) => {
    try {
      const status = await api.put(`${API_URL}/settings/extras/${id}`, updateInfo)
      return status.data
    } catch (err) {
      console.warn('catch :: studios :: UpdateExtra', err)
      return err
    }
  },
  createExtra: async createExtra => {
    try {
      const status = await api.post(`${API_URL}/settings/extras`, createExtra)
      return status.data
    } catch (err) {
      console.warn('catch :: extras :: createExtra', err)
      return err
    }
  },
  deleteOne: async (id) => {
    try {
      const r = await api.delete(`${API_URL}/settings/extras/${id}`)
      return r.data
    } catch (e) {
      console.warn('catch :: extras :: deleteOne', e)
      return e
    }
  }
}
