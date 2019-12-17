import api from '../api'

export default {
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
  methods: {
    async getAll (page, filter) {
      this.loading.list = true
      const { name } = this.$options
      const { data } = await api[name][name].getAll(page, filter)
      if (data) {
        this.list = data.items
        this.loading.list = false
      }
      return data
    },
    async addNew (payload) {
      this.loading.one = true
      this.idOfJustAdded = 0
      const { name } = this.$options
      const res = await api[name][name].addNew(payload)
      if (res) {
        this.idOfJustAdded = res.id
      }
      this.loading.one = false
      return res
    }
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
      if (v || this.loading.list) {
        this.$q.loading.show()
      } else {
        this.$q.loading.hide()
      }
    }
  }
}
