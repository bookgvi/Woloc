import api from './instance'
import { ApiObject } from './abstractAPI'

const API_URL = process.env.API_CABINET_URL
// eslint-disable-next-line
const customers = new ApiObject(`${API_URL}/customers`)
export default {
  customers,
  getSearchedCustomers: async (search) => {
    try {
      const r = await api.get(`${API_URL}/customers`, {
        params: { search }
      })

      return r.data
    } catch (e) {
      console.warn('catch :: customers :: getSearchedCustomers', e)
    }
  }
}
