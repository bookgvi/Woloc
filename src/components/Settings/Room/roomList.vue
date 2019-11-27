<template lang="pug">
  .roomList
    .row.cursor-pointer(
      v-for="(room, index) in rooms"
      :key="index"
      style="width: 200px;"
      :class="room.id === selectedRoom ? { 'bg-grey-3': backGround } : { 'bg-white': backGround }"
    )
      .col.align-right
        q-btn.q-ml-sm(
          flat
          @click="$emit('setCurrentRoom', rooms[index])"
          style="width: 100%"
        ) Зал {{ room.name }}
</template>

<script>
export default {
  name: 'roomList',
  props: {
    rooms: {
      type: Array,
      default: () => []
    },
    selectedRoom: {
      validator: value => {
        return ['null', 'number'].indexOf(typeof value) !== -1
      },
      default: _ => null
    }
  },
  data () {
    return {
      backGround: true
    }
  }
}
</script>

<style scoped>
  #room:hover {
    background-color: #eeeeee;
  }
</style>
