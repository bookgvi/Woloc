import crudMixin from '../crudMixin'
import api from '../../api'

export default {
  created () {
    this.getAll()
  },
  name: 'discounts',
  mixins: [crudMixin],
  methods: {
    async addNew (payload) {
      this.loading.one = true
      this.idOfJustAdded = 0
      const res = await api.discounts.addNew(payload)
      if (res) {
        this.idOfJustAdded = res.id
      }
      this.loading.one = false
    }
  }
}
