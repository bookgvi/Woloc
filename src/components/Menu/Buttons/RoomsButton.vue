<template lang="pug">
  q-btn.btn-filter(
    outline
    color="secondary"
    no-caps
    :label="roomsAmount"
  )
    q-popup-proxy(
    )
      q-option-group.text-body2.q-pa-md(
        v-model="$app.studios.checkedRooms"
        :options="rooms"
        color="green"
        type="checkbox"
      )
</template>

<script>
export default {
  name: 'StudiosButton',
  data () {
    return {
    }
  },
  computed: {
    roomsAmount () {
      return `Залы ${this.rooms.length}`
    },
    studio () {
      return this.$app.studios.studio
    },
    rooms () {
      if (this.$app.studios.list.length === 0) return []
      const arr = this.$app.studios.getRoomsByStudio(this.studio).map((item) => {
        const room = Object.assign({}, {
          value: item.id,
          label: item.name,
        })
        return room
      })
      return arr
    }
  }
}
</script>

<style scoped>

</style>
