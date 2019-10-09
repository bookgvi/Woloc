<template lang="pug">
  .settings
    div(v-show="false") {{ studioID }}
    q-tab-panels(v-model="currentTab")
      q-tab-panel.q-pa-none(name="Локация")
        location(
          :singleStudio="singleStudio"
          :rooms="rooms"
          :isSave="isSave"
          :services="services"
          :vendors="vendors"
          @updateStudio="updateStudio"
          @newStudio="newStudio"
          @createNewStudio="createNewStudio"
        )
</template>

<script>
import location from './main'
import studios from '../../../api/studios'
export default {
  name: 'setting',
  components: {
    location
  },
  data () {
    return {
      id: this.$app.filters.getValues('settings').studio,
      currentTab: 'Локация',
      tabs: ['Локация'],
      allStudiosName: [],
      singleStudio: {},
      currentStudio: '',
      isSave: false,
      rooms: [],
      services: [],
      vendors: []
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
      let { studio } = this.$app.filters.getValues('settings')
      const { items } = await studios.getAll().then(resp => resp.data)
      if (!studio) {
        studio = items[0].id
      }
      if (this.currentStudio !== 'settings') {
        this.$app.filters.setValue('settings', 'studio', studio)
        this.currentStudio = 'settings'
        return
      }
      this.currentStudio = 'settings'
      this.isSave = false
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
    },
    async newStudio () {
      this.currentStudio = ''
      this.isSave = true
      this.singleStudio = { lat: 55.786419, lon: 37.725433 }
      this.rooms = []
      this.services = []
      this.vendors = []
    },
    async createNewStudio () {
      const result = await studios.createStudio(this.singleStudio)
      if (result) {
        this.isSave = false
      }
    }
  },
  async mounted () {
    this.singleStudioM()
  }
}
</script>
