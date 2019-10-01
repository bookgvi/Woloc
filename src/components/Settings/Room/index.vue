<template lang="pug">
  .room
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
        specifications(:singleStudio="singleStudio")
      .col-3
</template>

<script>
import roomData from './roomData'
import specifications from './specifications'
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
    specifications
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
