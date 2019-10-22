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
      console.log(`we're on page`, this.$route.path)
      if (this.$route.path === '/bookings') {
        if ((filter.studio && !filter.rooms) || (filter.studio && filter.rooms.length)) {
          this.fetchData(page, rowsPerPage, filter, pagination)
        }
      } else {
        this.fetchData(page, rowsPerPage, filter, pagination)
      }
    },
    setPagination (prop, value) {
      const { pagination, filter } = this
      if (pagination[prop] === value) return

      this.onRequest({ ...pagination, [prop]: value }, filter)
    },
    async fetchData (page, rowsPerPage, filter, pagination) {
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
