import { sortBy } from 'lodash'

export default {
  name: 'rooms',
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
    getAvailable (filter) {
      const studio = this.$app.studios.getFiltered(filter)

      return studio ? studio.rooms : []
    },
    getFiltered (filter) {
      return this.getAvailable(filter).filter(({ id }) => (filter.rooms || []).includes(id))
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
