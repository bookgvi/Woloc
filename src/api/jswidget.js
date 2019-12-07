import api from './instance'

const API_URL = process.env.API_CABINET_URL

export default {
  getOne: async id => {
    try {
      const { data } = await api.get(`${API_URL}/settings/jswidget/${id}`)
      return data
    } catch (e) {
      console.warn('catch :: jswidget :: getjswidget', e)
      return e
    }
  },
}
