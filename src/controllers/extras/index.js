import api from '../../api'
import { sortBy } from 'lodash'

export default {
  name: 'extras',
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
          value: this.all[i].name,
          price: this.all[i].price,
        }))
      }
      return arr
    }
  },
  methods: {
    async getAll () {
      this.loading.list = true
      const res = await api.extras.getAll()
      console.log('extras :: getAll', res)
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
