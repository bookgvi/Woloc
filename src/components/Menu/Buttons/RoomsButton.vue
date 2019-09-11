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
        v-model="checkedRooms"
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
    checkedRooms: {
      get: function () {
        if (this.$app.studios.checkedRooms.length === this.rooms.length) {
          return true
        } else {
          return false
        }
      },
      set: function (value) {
        if (value === true) {
          this.$app.studios.checkedRooms = this.rooms.map((item) => item.value)
        } else {
          this.$app.studios.checkedRooms = []
        }
      }
    },
    rooms () {
      if (this.$app.studios.list.length === 0) return []
      const arr = this.$app.studios.getRoomsByStudio(this.$app.studios.studio).map((item) => {
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
