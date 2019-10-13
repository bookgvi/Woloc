<template lang="pug">
  .extras
    .menu.menu--menu2
      filters-list(name="settings" :isFirstPosition="false")
        template(#prepend="props")
          studio-filter(v-bind="props")
    .content--content2
      .row
        ExtrasTable(:singleStudio="singleStudio" :rooms="rooms")
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
      rooms: [],
      singleStudio: {}
    }
  },
  methods: {
    async singleStudioM () {
      let { studio } = this.$app.filters.getValues('settings')
      const { items } = await studios.getAll().then(resp => resp.data)
      if (!studio) {
        studio = items[0].id
      }
      if (this.currentStudio !== 'settings') {
        this.$app.filters.setValue('settings', 'studio', studio)
      }
      this.currentStudio = 'settings'
      this.isSave = false
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
