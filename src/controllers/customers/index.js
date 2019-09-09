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
  async created () {
    await this.getAll()
  },
  computed: {
    all () {
      return sortBy(this.list, 'lastName')
    },
    forSelect () {
      let arr = []
      arr.push({
        label: 'Любая',
        value: 0
      })
      for (let i = 0; i < this.all.length; i++) {
        arr.push(Object.assign({}, {
          label: this.all[i].name,
          value: this.all[i].name
        }))
      }
      return arr
    },
    forCalendar () {
      const arr = this.all.map((customer) => {
        customer.fullName = customer.lastName + ' ' + customer.firstName
        return customer
      })
      return arr
    }
  },
  methods: {
    async getAll (page) {
      this.loading.list = true
      const { data } = await api.customers.getAll(page)
      console.log('customers :: getAll', data)
      if (data) {
        this.list = data.items.filter(customer => customer.lastName.length > 0)
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
