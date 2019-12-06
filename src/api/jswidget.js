// import jswidget from 'src/mocks/jswidget'
import api from './instance'
const API_URL = process.env.API_CABINET_URL
export default {
  getOne: async (id) => {
    try {
      const r = await api.get(`${API_URL}/settings/jswidget/${id}`)
      return r.data
    } catch (e) {
      console.warn('catch :: jsWidget :: getWidget', e)
      return e
    }
  }
}
