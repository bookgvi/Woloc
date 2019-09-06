import api from './instance'

export default {

  getSearchedUsers: async (payload) => {
    try {
      const result = await api.post('cabinet/v1.0/customers', payload)
      return result
    } catch (e) {
      console.warn('catch :: users :: getSearchedUsers', e)
    }
  }
}
