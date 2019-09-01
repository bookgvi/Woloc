<template lang="pug">
  .q-py-md.row.col-12
    .col-7.row.justify-left.items-center
      q-option-group(
        v-model="event"
        :options="events"
        option-value="name"
      )
    .col-5.flex.justify-left.items-center
      q-list
        q-item(
          v-for="(event, index) in events"
          :key="index"
        )
          .text.text_gray {{ event.price }} р.
</template>

<script>
export default {
  name: 'CalendarEvent',
  data () {
    return {
      events: [],
      event: ''
    }
  },
  created: async function () {
    this.events = this.$app.events.list.map((item) => {
      const event = {
        value: item.name,
        label: item.alias,
        price: item.price
      }
      return event
    })
    this.event = this.events[0].value
  }
}
</script>

<style scoped>

</style>
