<template lang="pug">
  .room
    .row.q-pt-md
      .col-2
        .row(v-for="(room, index) in rooms" :key="index")
          q-btn(
            @click="currentRoom=room"
            no-caps
            flat
          ) Зал {{ room.name }}
      .col-10
        .inline-block {{ singleStudio.id }}
</template>

<script>
export default {
  props: {
    rooms: Array,
    singleStudio: Object
  },
  data () {
    return {
      changeRoom: this.rooms[0]
    }
  },
  components: {
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
