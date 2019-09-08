import api from './instance'

export default {

  getAll: async () => {
    try {
      const r = await api.get('studios')
      return r.data
    } catch (e) {
      console.warn('catch :: studios :: getAll', e)
    }
  }
}
