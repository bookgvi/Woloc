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
      console.log('connectedMixin', filter)
      const { page, rowsPerPage } = pagination
      let isEmpty = 0
      if (this.$route.path === '/bookings') {
        if ((filter.studio && !filter.rooms) || (filter.studio && filter.rooms.length)) {
          isEmpty = false
          this.fetchData(page, rowsPerPage, filter, pagination, isEmpty)
        } else {
          isEmpty = true
          this.fetchData(page, rowsPerPage, filter, pagination, isEmpty)
        }
      } else {
        isEmpty = false
        this.fetchData(page, rowsPerPage, filter, pagination, isEmpty)
      }
    },
    setPagination (prop, value) {
      const { pagination, filter } = this
      if (pagination[prop] === value) return

      this.onRequest({ ...pagination, [prop]: value }, filter)
    },
    async fetchData (page, rowsPerPage, filter, pagination, isEmpty) {
      if (isEmpty) {
        this.data = []
        return
      }
      let { items, total, data } = await this.loadData({ number: page, size: rowsPerPage }, filter)
      if (data) {
        this.account.amount = data.account.amount
        items = data.transactions.items
        total = data.transactions.total
      }
      this.data = items
      Object.assign(this.pagination, pagination, { rowsNumber: total })
    }
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
