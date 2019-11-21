import studios from '../../api/studios'

const defaultValues = {
  customers: {},
  bookings: {
    studio: null,
    rooms: null,
    statuses: null,
    technical: null
  },
  refunds: {
    studio: null,
    rooms: null,
    statuses: null
  },
  settings: {
    studio: null
  },
  calendar: {
    studio: null,
    rooms: null,
    events: null,
    price: null
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
    filterCustomer (id) {
      this.readFromSession()
      this.values.bookings = { customer: id }
      this.saveToSession()
    },
    async filterDefault (page) {
      this.readFromSession()
      if (!this.values[page].studio) {
        let filter = {}
        this.readFromSession()
        this.values.bookings = {}
        this.saveToSession()
        let { studio } = this.getValues(page)
        const { items } = await studios.getAll().then(resp => resp.data)
        if (!studio) {
          let [{ rooms }] = items.filter(item => item.id === items[0].id)
          rooms = rooms.map(item => item.id)
          filter = Object.assign({}, {
            studio: items[0].id,
            rooms: rooms
          })
          this.setValue(page, 'studio', filter.studio)
          this.setValue(page, 'rooms', filter.rooms)
          if (page === 'refunds') {
            this.setValue(page, 'statuses', [0, 1, 2, 3])
          } else if (page === 'bookings') {
            this.setValue(page, 'statuses', [0, 1, 2, 3, 4])
            this.setValue(page, 'technical', false)
          } else if (page === 'calendar') {
            this.setValue(page, 'price', { min: 0, max: Infinity })
          }
        }
      }
    },
    async reset (page) {
      const { values } = this
      const { items } = await studios.getAll().then(resp => resp.data)
      let [{ rooms }] = items.filter(item => item.id === items[0].id)
      rooms = rooms.map(item => item.id)
      this.values = {
        ...values,
        [page]: { studio: items[0].id, rooms: rooms }
      }
      this.saveToSession()
      if (page === 'refunds') {
        this.setValue(page, 'statuses', [0, 1, 2, 3])
      } else if (page === 'bookings') {
        this.setValue(page, 'statuses', [0, 1, 2, 3, 4])
      } else if (page === 'calendar') {
        this.setValue(page, 'price', { min: 0, max: Infinity })
      }
    }
  }
}
