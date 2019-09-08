import api from './instance'

export default {
  login: async (data) => {
    try {
      const r = await api.post('auth/login', data)
      return r.data
    } catch (e) {
      console.warn('catch login', e)
      return e
    }
  }
}
