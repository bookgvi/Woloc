import api from './instance'
export default {
  async getJWT () {
    const login = await api.post('auth/login', {
      login: 'artem@ugoloc.ru',
      password: '123456'
    })
    return login.data
  },
  async getRooms () {
    const rooms = await api.get('studios')
    console.log(rooms)
  }
}
