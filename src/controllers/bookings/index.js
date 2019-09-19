import api from 'src/api'
import crudMixin from '../crudMixin'

export default {
  name: 'bookings',
  data () {
    return {
      calendarList: []
    }
  },
  mixins: [crudMixin],
  methods: {
    async getForCalendar (filter) {
      this.loading.list = true
      const res = await api.bookings.getForCalendar(filter)
      console.log('bookings :: getForCalendar', res)
      if (res) {
        this.calendarList = res.data.items
        this.loading.list = false
      }
    },

    async getOne (id) {
      this.loading.one = true

      const { data } = await api.bookings.getOne({ id: id })

      console.log(`bookings :: getOne`, data)

      if (data) {
        this.loading.one = false

        return data
      }
    },

    calendarGetObjById (id) {
      return this.calendarList.find(item => item.id === id) || {}
    },
    calendarGetIndexById (id) {
      console.log(id, this.list)
      return this.calendarList.findIndex(item => item.id === id)
    },
  },

}
