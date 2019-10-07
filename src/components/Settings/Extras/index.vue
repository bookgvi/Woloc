<template lang="pug">
  .extras
    div(v-show="false") {{ studioID }}
    filters-list(name="settings")
      template(#prepend="props")
        studio-filter(v-bind="props")
    .wrapper
      .row.q-pt-md

</template>

<script>
import StudioFilter from '../../Filters/StudioFilter'
import FiltersList from '../../Filters/FiltersList'
import studios from '../../../api/studios'
export default {
  name: 'setting',
  components: {
    StudioFilter,
    FiltersList
  },
  data () {
    return {
      id: this.$app.filters.getValues('settings').studio,
      allStudiosName: [],
      singleStudio: {},
      currentStudio: '',
    }
  },
  computed: {
    studioID () {
      this.singleStudioM()
      return this.$app.filters.getValues('settings').studio
    }
  },
  methods: {
    async singleStudioM () {
      if (this.currentStudio !== 'settings') {
        this.$app.filters.reset('settings')
        this.currentStudio = 'settings'
        return
      }
      this.currentStudio = 'settings'
      const { studio } = this.$app.filters.getValues('settings')
      const { items } = await studios.getAll().then(resp => resp.data)
      const [{ rooms }] = items.filter(item => item.id === studio)
      this.rooms = rooms
      this.singleStudio = await studios.getOne(studio).then(resp => resp.data)
      this.services = this.singleStudio.services
      this.vendors = this.singleStudio.vendors
    },
    async updateStudio (services, vendors) {
      this.singleStudio.services = services.map(item => {
        return { id: item.id }
      })
      this.singleStudio.vendors = vendors.map(item => {
        return { id: item.id }
      })
      const { studio } = this.$app.filters.getValues('settings')
      await studios.updateStudio(studio, this.singleStudio)
    }
  },
  async mounted () {
    this.singleStudioM()
  }
}
</script>
