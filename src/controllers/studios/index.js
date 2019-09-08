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
  created () {
  },
  computed: {
    all () {
      return sortBy(this.list, 'name')
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
      }
    },
    getRoomsByStudio (id) {
      return this.list.find(studio => studio.id === id).rooms || {}
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
