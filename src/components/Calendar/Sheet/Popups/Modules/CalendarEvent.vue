<template lang="pug">
  .q-py-md.row.col-12 {{ eventComp }}
    .col-7.text-body2
      q-option-group(
        v-model="event"
        :options="options"
      )
</template>

<script>
import sortBy from 'lodash/sortBy'

export default {
  name: 'CalendarEvent',
  data () {
    return {
      events: [],
      event: ''
    }
  },
  created () {
    if (this.startEvent) {
      this.event = this.startEvent
    }
  },
  computed: {
    eventComp () {
      return this.eventChange()
    },
    options () {
      return sortBy(this.$app.events.list, ['name']).map(({ alias, price }) => ({
        label: alias,
        value: alias,
        price,
      }))
    }
  },
  methods: {
    eventChange () {
      this.$emit('eventChange', this.event)
    }
  },
  props: ['startEvent']
}
</script>

<style scoped>

</style>
