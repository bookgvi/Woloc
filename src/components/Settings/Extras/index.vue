<template lang="pug">
  .extras
    filters-list(name="settings")
      template(#prepend="props")
        studio-filter(v-bind="props")
    .wrapper
      .row.q-pt-md
        .inline-block {{ singleStudio }}
        ExtrasTable
</template>

<script>
import StudioFilter from '../../Filters/StudioFilter'
import FiltersList from '../../Filters/FiltersList'
import studios from '../../../api/studios'
import ExtrasTable from './Table'
export default {
  name: 'setting',
  components: {
    StudioFilter,
    FiltersList,
    ExtrasTable
  },
  data () {
    return {
      id: this.$app.filters.getValues('settings').studio,
      allStudiosName: [],
      singleStudio: []
    }
  },
  methods: {
    async singleStudioM () {
      const { studio } = this.$app.filters.getValues('settings')
      const { items } = await studios.getAll().then(resp => resp.data)
      const [{ rooms }] = items.filter(item => item.id === studio)
      this.rooms = rooms
      this.singleStudio = await studios.getOne(studio).then(resp => resp.data)
      this.services = this.singleStudio.services
      this.vendors = this.singleStudio.vendors
    }
  },
  async mounted () {
    this.singleStudioM()
  }
}
</script>
