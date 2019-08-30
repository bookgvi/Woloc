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
      dialogs: {
        new: false,
        update: false,
        delete: false
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
    async getForTime (studio, dateFrom, dateTo) {
      this.loading.list = true
      const res = await api.bookings.getForTime({ studio, dateFrom, dateTo })
      console.log('bookings :: getAll', res)
      if (res) {
        this.list = res.data
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
