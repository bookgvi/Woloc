// import api from './instance'
import refunds from 'src/mocks/refunds'

export default {
  getAll: async () => {
    try {
      const r = {
        data: refunds
      }
      return r
    } catch (e) {
      console.warn('catch :: extras :: getAll', e)
    }
  }
}
