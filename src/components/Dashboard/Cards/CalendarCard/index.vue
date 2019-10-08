<template lang="pug">
  .q-pa-none
    q-card
      q-card-section
        span.row.text-bold.text-body1.q-pt-md.q-pl-sm {{ "Календарь"}}
      nav-bar(
        :startDate="date"
        @dateChange="date = $event"
      )
      q-card-section(
        v-if="!isAllDay"
        class="cursor-pointer"
        @click="isAllDay = true"
      )
        span.row.text-body2.text-blue-5.q-pt-md.q-pl-sm {{ "Показать 00:00-08:00"}}
      q-card-section(
        v-else
        class="cursor-pointer"
        @click="isAllDay = false"
      )
        span.row.text-body2.text-blue-5.q-pt-md.q-pl-sm {{ "Скрыть 00:00-08:00"}}
      calendar(
        :startDate="date"
        :isAllDay="isAllDay"
      )
</template>

<script>
import NavBar from './Modules/NavBar'
import Calendar from './Modules/Calendar'

export default {
  name: 'CalendarCard',
  components: {
    Calendar,
    NavBar,
  },
  created () {
    this.date = this.$moment({ hour: 0 }).parseZone()
  },
  data () {
    return {
      date: '',
      isAllDay: false
    }
  },
  computed: {
    dateFormatForLabel () {
      if (this.date === '') return '23 сентября, 2019'
      return `${this.$moment(this.date).format('D MMMM, YYYY')}`
    }
  }
}
</script>

<style scoped>

</style>
