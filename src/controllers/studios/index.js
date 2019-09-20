import crudMixin from '../crudMixin'

export default {
  name: 'studios',
  mixins: [crudMixin],
  methods: {
    getFiltered (filter) {
      if (filter) {
        return this.list.find(({ id }) => id === filter.studio)
      } else return {}
    },
  },
}
