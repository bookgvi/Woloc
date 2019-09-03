<template lang="pug">
  .q-py-md.row.col-12 {{ eventComp }}
    .col-7.text-body2
      q-option-group(
        v-model="event"
        :options="events"
      )
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
        value: item.alias,
        label: item.alias,
        price: item.price
      }
      return event
    })
    this.event = this.events[0].value
  },
  computed: {
    eventComp () {
      return this.eventChange()
    }
  },
  methods: {
    eventChange () {
      this.$emit('eventChange', this.event)
    }
  }
}
</script>

<style scoped>

</style>
