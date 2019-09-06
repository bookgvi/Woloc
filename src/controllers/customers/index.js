import api from '../../api'
import { sortBy } from 'lodash'

export default {
  name: 'customers',
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
      return sortBy(this.list, 'lastName')
    },
  },
  methods: {
    async getAll (page) {
      this.loading.list = true
      const { data } = await api.customers.getAll(page)
      console.log('customers :: getAll', data)
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
