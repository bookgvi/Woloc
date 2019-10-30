<template lang="pug">
  .dicounts
    .menu.menu--menu2
      filters-list(name="settings")
        template(#prepend="props")
          studio-filter(v-bind="props")
    .content--content2
      .row
        discountsTable(
          :singleStudio="singleStudio"
          :allStudiosName="allStudiosName"
          :rooms="rooms")
</template>

<script>
import StudioFilter from '../../Filters/StudioFilter'
import FiltersList from '../../Filters/FiltersList'
import studios from '../../../api/studios'
import discountsTable from './Table'
export default {
  name: 'dicounts',
  components: {
    StudioFilter,
    FiltersList,
    discountsTable
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
    async filter () {
      let filter = {}
      const { items } = await studios.getAll().then(resp => resp.data)
      let { studio } = this.$app.filters.getValues('settings')
      if (!studio) {
        let [{ rooms }] = items.filter(item => item.id === items[0].id)
        rooms = rooms.map(item => item.id)
        filter = Object.assign({}, {
          studio: items[0].id,
          rooms: rooms
        })
        this.$app.filters.setValue('settings', 'studio', filter.studio)
        studio = items[0].id
      }
      let { rooms } = this.$app.filters.getValues('settings')
      this.rooms = rooms
      this.singleStudio = await studios.getOne(studio).then(resp => resp.data)
      this.allStudiosName = items.map(item => item.name)
    }
  },
  async created () {
    this.filter()
  }
}
</script>
