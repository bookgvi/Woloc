<template lang="pug">
  q-card-section
    q-calendar(
      :interval-start="intervalStartCalendar"
      :interval-count="intervalCountCalendar"
      v-model="selectedDate"
      locale="ru-ru"
      no-scroll
      hide-header
      hour24-format
      view="day"
    )

</template>

<script>

export default {
  name: 'Calendar',
  data () {
    return {
    }
  },
  computed: {
    intervalStartCalendar () {
      return this.isAllDay ? 0 : 8
    },
    intervalCountCalendar () {
      return this.isAllDay ? 24 : 16
    },
    selectedDate () {
      if (!this.startDate) return this.$moment().format('YYYY-MM-DD')
      return this.$moment(this.startDate).format('YYYY-MM-DD')
    }
  },
  props: {
    startDate: Object,
    isAllDay: Boolean
  }
}
</script>

<style scoped>

</style>
