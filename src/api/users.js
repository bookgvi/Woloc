import api from './instance'

export default {

  getSearchedUsers: async (payload) => {
    try {
      const result = await api.post('users', payload)
      return result
    } catch (e) {
      console.warn('catch :: users :: getSearchedUsers', e)
    }
  }
}
