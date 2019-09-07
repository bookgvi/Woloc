import api from './instance'

export default {

  getAll: async (page) => {
    try {
      const r = await api.get('cabinet/v1.0/customers', {
        params: { page }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: customers :: getAll', e)
    }
  }
}
