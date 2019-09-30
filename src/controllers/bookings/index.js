import api from 'src/api'
import crudMixin from '../crudMixin'

export default {
  name: 'bookings',
  data () {
    return {
      calendarList: [],
      idOfJustAdded: 0,
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

    async addNew (payload) {
      this.loading.one = true
      const res = await api.bookings.addNew(payload)
      console.log('bookings :: addNew', res)
      if (res) {
        this.idOfJustAdded = res.id
        this.loading.one = false
      }
    },

    async deleteOne (id) {
      this.loading.one = true
      const res = await api.bookings.deleteOne({ id: id })
      console.log('bookings :: deleteOne', res)
      if (res) {
        this.loading.one = false
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
