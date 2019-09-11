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
      room: ''
    }
  },
  computed: {
    roomComp () {
      return this.roomChange()
    },
    rooms () {
      if (this.$app.studios.list.length === 0) return []
      const arr = this.$app.studios.getRoomsByStudio(this.studio).map((item, index) => {
        const room = Object.assign({}, {
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
      this.$emit('roomChange', { name: this.room })
    }
  },
  props: ['studio']
}
</script>

<style scoped>

</style>
