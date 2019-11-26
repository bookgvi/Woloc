<template lang="pug">
  .roomList
    .row(v-for="(room, index) in rooms" :key="index")
      q-btn(
        @click="$emit('setCurrentRoom', rooms[index])"
        no-caps
        flat
      ) Зал {{ room.name }}
</template>

<script>
export default {
  name: 'roomList',
  props: {
    rooms: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
