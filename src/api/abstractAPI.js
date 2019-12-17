import api from './instance'

export function ApiObject (url) {
  this.url = url
}

ApiObject.prototype.getAll = async function (page, filter) {
  try {
    const r = await api.get(this.url, {
      params: {
        page,
        ...filter
      }
    })
    return r.data
  } catch (e) {
    console.warn('catch :: bookings :: getAll', e)
    return e
  }
}

ApiObject.prototype.addNew = async function (payload) {
  try {
    const r = await api.post(this.url, payload)
    return r.data
  } catch (e) {
    console.warn('catch :: bookings :: addNew', e)
    return e
  }
}
