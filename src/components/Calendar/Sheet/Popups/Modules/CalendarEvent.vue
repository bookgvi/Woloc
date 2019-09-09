<template lang="pug">
  .q-py-md.row.col-12 {{ eventComp }}
    .col-7.text-body2
      q-option-group(
        v-model="event"
        :options="$app.events.forSelect"
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
