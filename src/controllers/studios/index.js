import api from '../../api'
import { sortBy } from 'lodash'

export default {
  name: 'studios',
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
      return sortBy(this.list, 'name')
    },
    forSelect () {
      let arr = []
      for (let i = 0; i < this.all.length; i++) {
        arr.push(Object.assign({}, {
          label: this.all[i].name,
          value: this.all[i].id
        }))
      }
      return arr
    }
  },
  methods: {
    async getAll () {
      this.loading.list = true
      const res = await api.studios.getAll()
      console.log('studios :: getAll', res)
      if (res) {
        this.list = res.data.items
        this.loading.list = false
        this.list.map(item => {
          item.reservedFrom = this.$moment(item.reservedFrom).format()
          item.reservedTo = this.$moment(item.reservedTo).format()
        })
      }
    },
    getFiltered (filter) {
      return this.list.find(({ id }) => id === filter.studio)
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
