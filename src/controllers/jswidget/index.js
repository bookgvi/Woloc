import api from '../../api/'

export default {
  name: 'jswidget',
  methods: {
    async getOne (id) {
      const data = await api.jswidget.getOne(id)
      return data
    }
  }
}
