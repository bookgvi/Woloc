import api from '../../api'
import { sortBy } from 'lodash'

export default {
  name: 'bookings',
  data () {
    return {
      loading: {
        list: false,
        one: false
      },
      list: [],
      calendarList: []
    }
  },
  created () {
  },
  computed: {
    all () {
      return sortBy(this.list, 'reservedFrom')
    },
    forSelect () {
      let arr = []
      for (let i = 0; i < this.all.length; i++) {
        arr.push(Object.assign({}, {
          label: this.all[i].title,
          value: this.all[i].id
        }))
      }
      return arr
    }
  },
  methods: {
    async getForCalendar (studio, dateFrom, dateTo) {
      this.loading.list = true
      const res = await api.bookings.getForCalendar({ studio, dateFrom, dateTo })
      console.log('bookings :: getForCalendar', res)
      if (res) {
        this.calendarList = res.data.items
        this.loading.list = false
      }
    },

    async getAll (page) {
      this.loading.list = true
      const { data } = await api.bookings.getAll(page)
      console.log('bookings :: getAll', data)
      if (data) {
        this.list = data.items

        this.loading.list = false
      }

      return data
    },
  },
  watch: {
    'loading.list' (v) {
      if (v) {
        this.$q.loading.show()
      } else {
        this.$q.loading.hide()
      }
    },
    'loading.one' (v) {
      if (v) {
        this.$q.loading.show()
      } else if (this.loading.list) {
        this.$q.loading.show()
      } else {
        this.$q.loading.hide()
      }
    }
  }
}
