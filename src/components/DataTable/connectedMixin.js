export default {
  props: {
    loadData: Function,
    filter: Object
  },
  watch: {
    filter (filter) {
      this.onRequest(this.pagination, filter)
    }
  },
  methods: {
    async onRequest (pagination, filter) {
      const { page, rowsPerPage } = pagination
      let { items, total, data } = await this.loadData({ number: page, size: rowsPerPage }, filter)
      if (data) {
        this.account.amount = data.account.amount
        items = data.transactions.items
        total = data.transactions.total
      }
      this.data = items
      console.log('data = ', this.data)
      Object.assign(this.pagination, pagination, { rowsNumber: total })
    },
    setPagination (prop, value) {
      const { pagination, filter } = this
      if (pagination[prop] === value) return

      this.onRequest({ ...pagination, [prop]: value }, filter)
    },
  },
  mounted () {
    this.onRequest(this.pagination, this.filter)
  },
  data () {
    return {
      pagination: {
        rowsPerPage: 10,
        rowsNumber: 100,
      }
    }
  }
}
