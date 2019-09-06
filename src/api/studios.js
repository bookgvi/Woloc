import api from './instance'

export default {
  getAll: async (page) => {
    try {
      const r = await api.get('studios', {
      })
      return r.data
    } catch (e) {
      console.warn('catch :: studios :: getAll', e)
    }
  }
}
