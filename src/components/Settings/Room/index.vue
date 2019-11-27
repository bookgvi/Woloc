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
        .col.fixed.bg-white
          room-list(
            :rooms="rooms"
            @setCurrentRoom="setCurrentRoom"
            :selectedRoom="selectedRoom.id"
            :key="reloadData"
          )
        .col-6
          roomData(
            :currentStudio="currentStudio"
            :selectedRoom="currentRoomData.name"
            :color="currentRoomData.color"
            :status="currentRoomData.status"
            :isRoom="currentRoomData.isRoom"
            :minHours="currentRoomData.minHours"
            :needPrepayment="currentRoomData.needPrepayment"
            :key="reloadData + 1"
          )
          specifications(
            :height="currentRoomData.height"
            :yardage="currentRoomData.yardage"
            :characteristics="currentRoomData.characteristics"
            :description="currentRoomData.description"
            :key="reloadData + 2"
          )
          payment(
            :payment="currentRoomData.payment"
            :key="reloadData + 3"
          )
          // -------------- TODO --------------------
          // images
          interior(
            :interiors="currentRoomData.interiors"
            :key="reloadData + 4"
          )
          backgrounds(
            :backgrounds="currentRoomData.backgrounds"
            :key="reloadData + 5"
          )
          // -------------- TODO --------------------
          // additionalServices
          // -------------- TODO --------------------
          // services(:singleStudio="singleStudio")
          .row
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
import room from '../../../api/room'
import RoomList from './roomList'
export default {
  data () {
    return {
      reloadData: 0,
      currentStudio: {},
      rooms: [],
      selectedRoom: {},
      currentRoomData: {}
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
      this.selectedRoom = this.rooms.length ? this.rooms[0] : {}
      if (this.selectedRoom.hasOwnProperty('id') && this.selectedRoom.id) {
        await this.getRoomData(this.selectedRoom.id)
      }
      this.reloadData++
    },
    async setCurrentRoom (room) {
      this.selectedRoom = room
      if (this.selectedRoom.hasOwnProperty('id') && this.selectedRoom.id) {
        await this.getRoomData(this.selectedRoom.id)
      }
      this.reloadData++
    },
    async getRoomData (id) {
      if (this.selectedRoom.hasOwnProperty('id') && this.selectedRoom.id) {
        this.currentRoomData = await room.getOne(id)
      }
    }
  }
}
</script>
