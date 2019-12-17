import api from './instance'
import { ApiObject } from './abstractAPI'
const API_URL = process.env.API_CABINET_URL
// eslint-disable-next-line
const discounts = new ApiObject(`${API_URL}/rooms/discounts`)
export default {
  discounts,
  updateOne: async (payload) => {
    const { id, data } = payload
    try {
      const r = await api.put(`${API_URL}/rooms/discounts/${id}`, data)
      return r.data
    } catch (e) {
      console.warn('catch :: discounts :: updateOne', e)
    }
  },
  deleteOne: async (payload) => {
    const { id } = payload
    try {
      const r = await api.delete(`${API_URL}/rooms/discounts/${id}`)
      return r.data
    } catch (e) {
      console.warn('catch :: discounts :: deleteOne', e)
    }
  }
}
