export default {
  props: {
    getData: Function,
    filter: Object
  },
  watch: {
    filter (filter) {
      console.log('watch', filter)
      this.onRequest(this.pagination, filter)
    }
  },
  methods: {
    async onRequest (pagination, filter) {
      const { page, rowsPerPage } = pagination
      const { items, total } = await this.getData({ number: page, size: rowsPerPage }, filter)
      this.data = items

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
