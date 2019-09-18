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
      return this.studio.rooms.map(({ name }, index) => ({
        value: name,
        label: name,
        color: roomsColors[index].color
      }))
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
