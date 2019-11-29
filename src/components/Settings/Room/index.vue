<template lang="pug">
  .room(:key="filterChanged")
    .menu.menu--menu2
      filters-list(name="settings")
        template(#prepend="props")
          studio-filter(v-bind="props")
        template(#append)
          q-btn.q-btn--no-uppercase(label="Добавить зал" dense color="primary" @click="createNew")
    .content--content2
      .row.q-py-md.q-pr-sm(:key="reloadData")
        .col-3
        .col.fixed.bg-white
          room-list(
            :rooms="rooms"
            @setCurrentRoom="setCurrentRoom"
            :selectedRoom="selectedRoom.id"
          )
        .col-9
          roomData(
            :currentStudio="currentStudio"
            :roomData="currentRoomData"
          )
          specifications(
            :specification="currentRoomData"
          )
          payment(
            :payment="currentRoomData.payment"
          )
          // -------------- TODO --------------------
          // images
          // ----------------------------------------
          interior(
            :interiors="currentRoomData.interiors"
          )
          backgrounds(
            :backgrounds="currentRoomData.backgrounds"
          )
          additionalServices(
            :extras="currentRoomData.extras"
          )
          // -------------- TODO --------------------
          // services(:singleStudio="singleStudio")
          // ----------------------------------------
          .row
            q-btn.fit.bg-primary.text-white(label="Сохранить" no-caps @click="saveChanges")
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
import room from '../../../api/room'
import RoomList from './roomList'
import studios from '../../../api/studios'
export default {
  data () {
    return {
      isPost: false,
      reloadData: 0,
      currentStudio: {},
      rooms: [],
      selectedRoom: {},
      currentRoomData: {},
      isRequired: false
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
  computed: {
    filterChanged () {
      this.getStudioAndRoom()
      return this.$app.filters.getValues('settings').studio
    }
  },
  async created () {
    this.getStudioAndRoom()
  },
  methods: {
    async getStudioAndRoom () {
      this.currentRoomData = {}
      let filter = this.$app.filters.getValues('settings')
      if (!filter.studio) return
      this.currentStudio = await this.$app.studios.getFiltered(filter)
      if (!this.currentStudio) return
      this.rooms = this.$app.rooms.getFiltered(filter)
      if (!this.rooms) return
      this.selectedRoom = this.rooms.length ? this.rooms[0] : {}
      if (this.selectedRoom.hasOwnProperty('id') && this.selectedRoom.id) {
        this.currentRoomData = await this.getRoomData(this.selectedRoom.id)
      }
      this.reloadData++
      this.isPost = false
    },
    async setCurrentRoom (room) {
      this.selectedRoom = room
      if (this.selectedRoom.hasOwnProperty('id') && this.selectedRoom.id) {
        this.currentRoomData = await this.getRoomData(this.selectedRoom.id)
      }
      this.isPost = false
      this.reloadData++
    },
    async getRoomData (id) {
      if (this.selectedRoom.hasOwnProperty('id') && this.selectedRoom.id) {
        const currentRoomData = await room.getOne(id)
        return currentRoomData
      }
    },
    async getAllRooms (id) { // Получаем массив всех залов локации id
      const { items } = await studios.getAll().then(resp => resp.data)
      const [{ rooms }] = items.filter(item => item.id === id)
      return rooms
    },
    async createNew () {
      const filter = this.$app.filters.getValues('settings')
      const { data } = await room.getDefault()
      this.currentStudio = this.$app.studios.getFiltered(filter)
      this.currentRoomData = data
      this.currentRoomData.studio.id = filter.studio
      // this.currentRoomData = await room.getEmpty()
      this.isPost = true
      this.reloadData++
    },
    async saveChanges () {
      if (!this.currentRoomData.name ||
          !this.currentRoomData.height ||
          !this.currentRoomData.yardage
      ) {
        this.isRequired = true
        console.warn('Заполните обязательные поля')
        this.showNotif()
        return
      }
      this.isRequired = false
      if (this.isPost) {
        await room.createRoom(this.currentRoomData)
        this.rooms = await this.getAllRooms(this.currentRoomData.studio.id) // Обновляем список залов для блока слева
        const newRoom = this.rooms.filter(item => item.name === this.currentRoomData.name)[0]
        this.setCurrentRoom(newRoom) // Выбираем новосозданный зал в списке
      } else {
        await room.updateRoom(this.currentRoomData.id, this.currentRoomData)
        this.rooms = await this.getAllRooms(this.currentRoomData.studio.id) // Обновляем список залов для блока слева
      }
      this.reloadData++
    },
    showNotif () {
      this.$q.notify({
        message: 'Заполните обязательные поля',
        color: 'purple'
      })
    }
  }
}
</script>
