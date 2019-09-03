// import api from './instance'
import customers from 'src/mocks/customers'

export default {

  getAll: async () => {
    try {
      const r = {
        data: customers
      }
      return r
    } catch (e) {
      console.warn('catch :: customers :: getAll', e)
    }
  }
}
