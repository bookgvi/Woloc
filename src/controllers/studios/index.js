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
      studio: 371,
      checkedRooms: []
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
    },
    selectedStudioLabel () {
      if (this.list.length !== 0) {
        return this.all.find(item => item.id === this.studio).name
      } else {
        return 'Студия'
      }
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
      return this.list.find(studio => studio.id === id).rooms || []
    },
    getFilteredRoomsByStudio (id) {
      const rooms = this.list.find(studio => studio.id === id).rooms || []
      const arr = rooms.filter(item => this.checkedRooms.indexOf(item.id) !== -1)
      return arr
    },
  },
  watch: {
    'studio' (v) {
      this.checkedRooms = []
      console.log(this.checkedRooms)
    },
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
