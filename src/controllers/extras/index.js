import crudMixin from '../crudMixin'
import api from '../../api'

export default {
  data () {
    return {
      extrasForRoom: {},
      extrasForBooking: []
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    async getForCalendar (payload) {
      this.loading.list = true
      const res = await api.extras.getForCalendar(payload)
      if (res) {
        this.extrasForRoom = res.data
      }
      this.loading.list = false
    },

  },
  name: 'extras',
  mixins: [crudMixin],
}
