export default {
  name: 'filters',
  data () {
    return {
      values: {
        bookings: {
          studio: 37
        },
        calendar: {
          studio: 37
        }
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
