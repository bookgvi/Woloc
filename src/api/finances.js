// import api from './instance'
import finances from 'src/mocks/finances'
export default {
  getAll: async () => {
    try {
      const r = {
        data: finances
      }
      return r
    } catch (e) {
      console.warn('catch :: finances :: getAll', e)
    }
  }
}
