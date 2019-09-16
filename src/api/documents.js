// import api from './instance'
import documents from 'src/mocks/documents'
export default {
  getAll: async () => {
    try {
      const r = {
        data: documents
      }
      return r
    } catch (e) {
      console.warn('catch :: extras :: getAll', e)
    }
  }
}
