import api from '../../api'
// import { sortBy } from 'lodash'
export default {
  name: 'refunds',
  data: () => ({
    users: []
  }),
  async created () {
    // console.log(await api.getJWT())
    await api.getRooms()
  }
}
