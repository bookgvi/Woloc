<template lang="pug">
  q-btn.btn-filter(
    outline
    color="secondary"
    no-caps
    :label="roomsAmount"
  )
    q-popup-proxy
      .row.span.text-body2.text-weight-bold.q-pa-md {{ $app.studios.selectedStudioLabel }}
      q-option-group.text-body2.q-px-md(
        v-model="$app.studios.checkedRooms"
        :options="rooms"
        color="green"
        type="checkbox"
      )
      q-checkbox.text-body2.q-px-md(
        label="Все залы"
        color="black"
        :options="$app.studios.checkedRooms"
        :value="roomsIds"
      )
</template>

<script>
export default {
  name: 'StudiosButton',
  data () {
    return {
      roomsIds: []
    }
  },
  created () {
    if (this.$app.studios.list.length === 0) return []
    const arr = this.$app.studios.getRoomsByStudio(this.studio).map((item) => {
      return item.id
    })
    console.log(arr, this.$app.studios.checkedRooms)
    this.roomsIds = arr
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
