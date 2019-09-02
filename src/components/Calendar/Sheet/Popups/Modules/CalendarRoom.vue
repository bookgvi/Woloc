<template lang="pug">
  q-option-group.col-12.justify-left.items-center(
    v-model="room"
    :options="rooms"
    keep-color
  ) {{ roomComp }}
</template>

<script>
import roomsColors from 'src/common/rooms/colors'
export default {
  name: 'CalendarRoom',
  data () {
    return {
      rooms: [],
      room: ''
    }
  },
  created: async function () {
    this.rooms = this.$app.rooms.list.map((item, index) => {
      const room = {
        value: item.name,
        label: item.name,
        color: roomsColors[index].color
      }
      return room
    })
    this.room = this.rooms[0].value
  },
  computed: {
    roomComp () {
      return this.roomChange()
    }
  },
  methods: {
    roomChange () {
      this.$emit('roomChange', { name: this.room })
    }
  }
}
</script>

<style scoped>

</style>
