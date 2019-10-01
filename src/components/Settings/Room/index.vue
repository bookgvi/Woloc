<template lang="pug">
  .room
    filters-list(name="settings")
      template(#prepend="props")
        studio-filter(v-bind="props")
      template(#append)
        q-btn.q-btn--no-uppercase(label="Добавить зал" dense color="primary" disable)
    .wrapper
      .row.q-pt-md
        .col-3
          .row(v-for="(room, index) in rooms" :key="index")
            q-btn(
              @click="currentRoom=room"
              no-caps
              flat
            ) Зал {{ room.name }}
        .col-6
          roomData(:singleStudio="singleStudio" :allStudiosName="allStudiosName" :currentRoom="currentRoom.name")
        .col-3
</template>

<script>
import roomData from './roomData'
import StudioFilter from '../../Filters/StudioFilter'
import FiltersList from '../../Filters/FiltersList'
export default {
  props: {
    rooms: Array,
    singleStudio: Object,
    allStudiosName: Array
  },
  data () {
    return {
      changeRoom: this.rooms[0]
    }
  },
  components: {
    roomData,
    StudioFilter,
    FiltersList
  },
  computed: {
    currentRoom: {
      get () {
        return this.changeRoom
      },
      set (room) {
        this.changeRoom = room
      }
    }
  }
}
</script>

<style>
</style>
