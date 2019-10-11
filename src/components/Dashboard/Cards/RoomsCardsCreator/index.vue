<template lang="pug">
  .q-pa-none
    rooms-card.q-mb-md(
      v-for="(item, index) in studios"
      :studio="item"
    )
</template>

<script>
import RoomsCard from './RoomsCard/index'
export default {
  name: 'RoomsCardsCreator',
  components: { RoomsCard },
  computed: {
    studios () {
      if (!this.$app.studios.list) return []
      return this.$app.studios.list.map(item => item.id)
    },
  },
}
</script>

<style scoped>

</style>
