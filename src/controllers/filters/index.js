const defaultValues = {
  bookings: {
    studio: 37
  },
  calendar: {
    studio: 37,
    rooms: [143, 144, 206, 207, 208]
  }
}

export default {
  name: 'filters',
  data () {
    return {
      values: defaultValues
    }
  },
  created () {
    this.readFromSession()
  },
  methods: {
    readFromSession () {
      const { filters } = sessionStorage

      if (filters) this.values = JSON.parse(filters)
    },
    saveToSession () {
      sessionStorage.filters = JSON.stringify(this.values)
    },
    getValues (page) {
      return this.values[page] || {}
    },
    setValue (page, name, value) {
      const { values } = this

      this.values = {
        ...values,
        [page]: {
          ...(values[page] || []),
          [name]: value
        }
      }
      this.saveToSession()
    },
    reset (page) {
      const { values } = this

      this.values = {
        ...values,
        [page]: defaultValues[page]
      }
      this.saveToSession()
    }
  }
}
