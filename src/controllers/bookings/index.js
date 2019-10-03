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
        let filteredList = res.data.items.filter(item => {
          const min = filter.price.min
          const max = (filter.price.max === 10000) ? Infinity : filter.price.max
          if (item.price >= min && item.price <= max &&
            filter.events.indexOf(item.eventType) !== -1) {
            return item
          }
        })
        this.calendarList = filteredList
        this.loading.list = false
      }
    },

    async addNew (payload) {
      this.loading.one = true
      this.idOfJustAdded = 0
      const res = await api.bookings.addNew(payload)
      console.log('bookings :: addNew', res)
      if (res) {
        this.idOfJustAdded = res.id
      }
      this.loading.one = false
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
      return this.calendarList.findIndex(item => item.id === id)
    },
  },

}
