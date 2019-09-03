import api from '../../api'
import { sortBy } from 'lodash'

export default {
  name: 'events',
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
      return sortBy(this.list, 'name')
    },
  },
  methods: {
    async getAll () {
      this.loading.list = true
      const res = await api.events.getAll()
      console.log('events :: getAll', res)
      if (res) {
        console.log(res)
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
