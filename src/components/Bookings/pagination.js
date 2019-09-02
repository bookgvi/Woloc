export default {
  methods: {
    async onRequest ({ filter, pagination: { page, rowsPerPage, sortBy, descending } }) {
      const startRow = (page - 1) * rowsPerPage

      this.data = await this.loadData(startRow, rowsPerPage, filter, sortBy, descending)
      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending
    },
    setPagination (prop, value) {
      this.pagination[prop] = value
      this.onRequest({ pagination: this.pagination })
    },
  },
  mounted () {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  data () {
    return {
      pagination: {
        sortBy: 'name',
        descending: false,
        rowsPerPage: 10,
        rowsNumber: 10
      },
    }
  }
}
