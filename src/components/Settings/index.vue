<template lang="pug">
  .wrapper
    .navTabs
      .row
        q-tabs(
          v-model="currentTab"
        )
          q-tab(
            v-for="(tab, index) in tabs"
            :key="index"
            :label="tab"
            :name="tab"
            no-caps
          )
        filters-list(
          name="settings"
          v-slot:default="props"
        )
          studio-filter(v-bind="props")
      div(v-show="false") {{ studioID }}
      q-tab-panels(v-model="currentTab")
        q-tab-panel.q-pa-none(name="Локация")
          location(:singleStudio="singleStudio" :rooms="rooms" @updateStudio="updateStudio")
        q-tab-panel.q-pa-none(name="Залы")
          room(:rooms="rooms" :singleStudio="singleStudio" :allStudiosName="allStudiosName")
</template>

<script>
import StudioFilter from '../Filters/StudioFilter'
import FiltersList from '../Filters/FiltersList'
import location from './Location'
import room from './Room'
import studios from '../../api/studios'
export default {
  name: 'setting',
  components: {
    StudioFilter,
    FiltersList,
    location,
    room
  },
  data () {
    return {
      id: this.$app.filters.getValues('settings').studio,
      currentTab: 'Локация',
      tabs: ['Локация', 'Залы'],
      allStudiosName: [],
      singleStudio: {},
      rooms: []
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
      const { studio } = this.$app.filters.getValues('settings')
      const { items } = await studios.getAll().then(resp => resp.data)
      this.allStudiosName = items.map(item => item.name)
      const [{ rooms }] = items.filter(item => item.id === studio)
      this.rooms = rooms
      this.singleStudio = await studios.getOne(studio).then(resp => resp.data)
      console.log('settings', this.singleStudio)
    },
    async updateStudio () {
      const { studio } = this.$app.filters.getValues('settings')
      await studios.updateStudio(studio, this.singleStudio)
    }
  },
  async mounted () {
    this.singleStudioM()
  }
}
</script>
