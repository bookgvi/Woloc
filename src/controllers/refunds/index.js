import crudMixin from '../crudMixin'
import api from '../../api'

export default {
  name: 'refunds',
  mixins: [crudMixin],
  data () {
    return {
      dashboardRefundsList: []
    }
  },
  methods: {
    async getForDashBoard (page, filter) {
      this.loading.list = true
      const res = await api.refunds.getAll(page, filter)
      if (res) {
        this.dashboardRefundsList = res.data.items
      }
      this.loading.list = false
    },
    async confirm (id) {
      const result = await api.refunds.confirm(id)
      return result
    },
    async cancel (id) {
      const result = await api.refunds.cancel(id)
      return result
    }
  }
}
