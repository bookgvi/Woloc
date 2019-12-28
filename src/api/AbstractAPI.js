import api from './instance'

export function AbstractAPI (url) {
  this.url = url
}

AbstractAPI.prototype = {
  getAll: async function (page, filter) {
    try {
      const r = await api.get(this.url, {
        params: {
          page,
          ...filter
        }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: getAll', e)
      return e
    }
  },

  getOne: async function ({ id }) {
    try {
      const r = await api.get(`${this.url}/${id}`)
      return r.data
    } catch (e) {
      console.warn('catch :: getOne', e)
      return e
    }
  },

  updateOne: async function (payload) {
    const { id, data } = payload
    try {
      const status = await api.put(`${this.url}/${id}`, data)
      return status.data
    } catch (err) {
      console.warn('catch :: UpdateOne', err)
      return err
    }
  },

  addNew: async function (payload) {
    try {
      const status = await api.post(this.url, payload)
      return status.data
    } catch (err) {
      console.warn('catch :: createNew', err)
      return err
    }
  },

  deleteOne: async function (payload) {
    const { id } = payload
    try {
      const r = await api.delete(`${this.url}/${id}`)
      return r.data
    } catch (e) {
      console.warn('catch :: deleteOne', e)
    }
  },

  uploadImage: async function (payload, config) {
    try {
      const status = await api.post(`${this.url}/upload-image`, payload, config)
      return status.data
    } catch (err) {
      console.warn('catch :: uploadImage', err)
      return err
    }
  }
}

Object.defineProperty('Abstract.prototype', 'constructor', {
  value: 'AbstractAPI',
  enumerable: false
})
