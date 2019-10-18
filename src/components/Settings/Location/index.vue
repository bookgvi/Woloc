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
          @phoneChange="phoneChange"
        )
        q-dialog(v-model="isRequiredFields")
          q-card
            .alarmo.q-pa-lg
              .row.q-pb-sm
                .col
                  q-icon.text-red(name="warning" style="font-size: 4rem;")
                  .text-h6.text-red Заполните обязательные поля
              .row.justify-center
                .col-4
                  q-btn.bg-primary.text-white(label="Закрыть" @click="isRequiredFields = false")
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
      isRequiredFields: false,
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
      this.currentStudio = studio
      this.isSave = false
      const [{ rooms }] = items.filter(item => item.id === studio)
      this.rooms = rooms
      this.singleStudio = await studios.getOne(studio).then(resp => resp.data)
      this.services = this.singleStudio.services
      this.vendors = this.singleStudio.vendors
    },
    async updateStudio (services, vendors) {
      this.singleStudio.services = services.map(item => {
        return { id1: item.id }
      })
      this.singleStudio.vendors = vendors.map(item => {
        return { id: item.id }
      })
      let { studio } = this.$app.filters.getValues('settings')
      if (!studio) {
        studio = this.currentStudio
      }
      if (
        !this.singleStudio.name ||
        !this.singleStudio.phone ||
        !this.singleStudio ||
        !this.singleStudio.limit ||
        !this.singleStudio.height ||
        !this.singleStudio.yardage ||
        !this.singleStudio.address
      ) {
        this.isRequiredFields = true
        return
      }
      await studios.updateStudio(studio, this.singleStudio)
    },
    async newStudio () {
      this.isSave = true
      this.singleStudio = { lat: 55.786419, lon: 37.725433 }
      this.rooms = []
      this.services = []
      this.vendors = []
    },
    async createNewStudio () {
      if (
        !this.singleStudio.name ||
        !this.singleStudio.phone ||
        !this.singleStudio ||
        !this.singleStudio.limit ||
        !this.singleStudio.height ||
        !this.singleStudio.yardage ||
        !this.singleStudio.address
      ) {
        this.isRequiredFields = true
        return
      }
      const result = await studios.createStudio(this.singleStudio)
      if (result) {
        this.isSave = false
      }
    },
    phoneChange (value) {
      value = this.reformatPhone(value)
      console.log(value)
      this.singleStudio.phone = value
    },
    reformatPhone (phone) {
      return String(phone.split('').filter(item => !isNaN(item) && item !== ' ').join(''))
    }
  },
  async mounted () {
    this.singleStudioM()
  }
}
</script>
