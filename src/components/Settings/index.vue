<template lang="pug">
  .settings
    .wrapper
      .row
        q-tabs(
          v-model="currentTab"
          shrink
          align="justify"
          animated
          no-caps
          active-color="black"
          narrow-indicator
          dense
        )
          q-tab(
            v-for="(tab, index) in tabs"
            :key="index"
            :label="tab"
            :name="tab"
          )
    div(v-show="false") {{ studioID }}
    q-tab-panels(v-model="currentTab")
      q-tab-panel.q-pa-none(name="Локация")
        location(:singleStudio="singleStudio" :rooms="rooms" @updateStudio="updateStudio")
</template>

<script>
import location from './Location'
import room from './Room'
import studios from '../../api/studios'
export default {
  name: 'setting',
  components: {
    location,
    room
  },
  data () {
    return {
      id: this.$app.filters.getValues('settings').studio,
      currentTab: 'Локация',
      tabs: ['Локация'],
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
      const [{ rooms }] = items.filter(item => item.id === studio)
      this.rooms = rooms
      this.singleStudio = await studios.getOne(studio).then(resp => resp.data)
      console.log('qqq', this.singleStudio)
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
