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
    }
  },
  created () {
  },
  computed: {
    all () {
      return sortBy(this.list, 'title')
    },
  },
  methods: {
    async getForCalendar (studio, dateFrom, dateTo) {
      this.loading.list = true
      const res = await api.bookings.getForCalendar({ studio, dateFrom, dateTo })
      console.log('bookings :: getForCalendar', res)
      if (res) {
        this.list = res.data.items
        this.loading.list = false
      }
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
