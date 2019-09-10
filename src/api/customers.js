import api from './instance'

export default {

  getAll: async (page) => {
    try {
      const r = await api.get('customers', {
        params: { page }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: customers :: getAll', e)
    }
  },
  getSearchedCustomers: async (search) => {
    try {
      const r = await api.get('customers', {
        params: { search }
      })
      console.log(r)
      return r.data
    } catch (e) {
      console.warn('catch :: customers :: getSearchedCustomers', e)
    }
  }
}
