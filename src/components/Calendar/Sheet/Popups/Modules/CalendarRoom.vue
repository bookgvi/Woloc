<template lang="pug">
  q-option-group.col-12.justify-left.items-center.text-body2(
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
      room: null
    }
  },
  created () {
    if (this.startRoom) {
      this.room = this.startRoom
    }
  },
  computed: {
    roomComp () {
      return this.roomChange()
    },
    selectedRoom () {
      if (!this.room) return {}
      return this.$app.rooms.getAvailable(this.filter).find(item => item.name === this.room)
    },
    rooms () {
      if (this.$app.rooms.getAvailable(this.filter).length === 0) return []
      const arr = this.$app.rooms.getAvailable(this.filter).map((item, index) => {
        const room = Object.assign({}, {
          id: item.id,
          value: item.name,
          label: item.name,
          color: roomsColors[index].color
        })
        return room
      })
      return arr
    }
  },
  methods: {
    roomChange () {
      this.$emit('roomChange', this.selectedRoom)
    }
  },
  props: ['filter', 'startRoom']
}
</script>

<style scoped>

</style>
