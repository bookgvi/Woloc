export default {
  name: 'filters',
  data () {
    return {
      values: {
      }
    }
  },
  methods: {
    setValue (page, name, value) {
      const { values } = this

      this.values = {
        ...values,
        [page]: {
          ...(values[page] || []),
          [name]: value
        }
      }
    }
  }
}
