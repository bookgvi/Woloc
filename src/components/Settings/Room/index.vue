<template lang="pug">
  .room
    .menu.menu--menu2
      filters-list(name="settings")
        template(#prepend="props")
          studio-filter(v-bind="props")
        template(#append)
          q-btn.q-btn--no-uppercase(label="Добавить зал" dense color="primary")
    .content--content2
      .row.q-py-md
        .col-3
          room-list(:rooms="rooms" @setCurrentRoom="setCurrentRoom")
        .col-6
          // roomData(:singleStudio="singleStudio" :allStudiosName="allStudiosName" :currentRoom="currentRoom")
          // specifications(:singleStudio="singleStudio")
          // payment
          // images
          // interior
          // backgrounds
          // additionalServices
          // services(:singleStudio="singleStudio")
          .row
            .col-6
              q-btn.fit.bg-primary.text-white(label="Сохранить" no-caps)
</template>

<script>
import roomData from './roomData'
import specifications from './specifications'
import payment from './payment'
import images from './images'
import interior from './interior'
import backgrounds from './backgrounds'
import additionalServices from './additionalServices'
import services from './services'
import StudioFilter from '../../Filters/StudioFilter'
import FiltersList from '../../Filters/FiltersList'
// import studios from '../../../api/studios'
import RoomList from './roomList'
export default {
  data () {
    return {
      currentStudio: {},
      rooms: [],
      selectedRoom: {}
    }
  },
  components: {
    RoomList,
    StudioFilter,
    FiltersList,
    roomData,
    specifications,
    payment,
    images,
    interior,
    backgrounds,
    additionalServices,
    services
  },
  async mounted () {
    this.$root.$on('changeFilter', _ => {
      this.getStudioAndRoom()
    })
    this.getStudioAndRoom()
  },
  methods: {
    async getStudioAndRoom () {
      const filter = this.$app.filters.getValues('settings')
      this.rooms = this.$app.rooms.getFiltered(filter)
      this.currentStudio = this.$app.studios.getFiltered(filter)
    },
    setCurrentRoom (room) {
      this.selectedRoom = room
    }
  }
}
</script>
