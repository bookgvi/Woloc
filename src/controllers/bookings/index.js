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
  },

}
