export default {
  methods: {
    async onRequest ({ pagination }) {
      const { page, rowsPerPage } = pagination
      const { items, total } = await this.controller.getAll({ number: page, size: rowsPerPage })

      this.data = items

      Object.assign(this.pagination, pagination, { rowsNumber: total })
    },
    setPagination (prop, value) {
      const { pagination } = this
      if (pagination[prop] === value) return

      this.onRequest({ pagination: { ...pagination, [prop]: value } })
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
        rowsPerPage: 10,
        rowsNumber: 100,
      },
    }
  }
}
