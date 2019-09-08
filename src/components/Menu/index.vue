<template lang="pug">
  .q-px-none
    q-separator

    .wrapper
      .row.items-center.q-py-md.q-gutter-x-sm
        q-btn(
          size="sm"
          outline
          no-caps
          color="black"
          label="Kap's Studios м. Бауманская"
          dense
        )
        q-btn(
          size="sm"
          outline
          color="secondary"
          no-caps
          :label="roomsAmount"
          dense
        )
          q-popup-proxy(
          )
            q-option-group.text-body2.q-pa-md(
              v-model="checkedRooms"
              :options="rooms"
              color="green"
              type="checkbox"
            )
        q-btn(
          size="sm"
          outline
          color="secondary"
          no-caps
          label="Цели"
          dense
        )
        q-btn(
          size="sm"
          outline
          color="secondary"
          no-caps
          label="Оплата"
          dense
        )
        q-space
        q-btn(
          size="sm"
          outline
          color="secondary"
          no-caps
          label="Сбросить все"
          dense
        )
    q-separator
</template>

<script>

export default {
  name: 'CalendarMenu',
  data () {
    return {
      rooms: [],
      checkedRooms: [],
    }
  },
  created: async function () {
    await this.$app.rooms.getAll()
    console.log('room', this.$app.rooms.list)
    this.rooms = this.$app.rooms.list.map((item) => {
      const room = Object.assign({}, {
        value: item.name,
        label: item.name,
        // color: item.color
      })
      return room
    })
  },
  computed: {
    roomsAmount () {
      return `Залы ${this.$app.rooms.list.length}`
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
