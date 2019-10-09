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
      template(#day-body="{ date, timeStartPos, timeDurationHeight }")
        timeline(
          :timeStartPos="timeStartPos"
          :timeDurationHeight="timeDurationHeight"
          :isAllDay ="isAllDay"
        )
        q-badge.absolute-top.block.q-pa-none(
          multi-line
          v-for="(e, index) in events"
          :value="e"
          v-if="e.date === date"
          :key="index"
          @click="findBooking(index)"
          :style="badgeStyles(e, 'body', timeStartPos, timeDurationHeight)"
        )
          .row.col-12.justify-start.q-pl-xs
            q-icon.col-1.row.justify-start(v-if="e.icon", :name="e.icon")
            .q-pa-none.col-1.offset-4(
              v-if="e.isNotFullVisible"
              :style="arrowUpStyles(e)"
            )
            .q-pa-none.col-1(
              v-if="e.isExtras"
              :style="triangleStyles(e)"
            )
            .row.col-12
              span.row.text-body2.ellipsis {{ e.title }}
            .row.col-12
              span.row.text-body2.ellipsis {{ e.details }}

</template>

<script>
import Timeline from 'src/components/Calendar/Sheet/Modules/Timeline'

export default {
  name: 'Calendar',
  components: { Timeline },
  data () {
    return {
      events: [],
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
    bookings: Array,
    isAllDay: Boolean
  },
  methods: {
    async loadData () {
      await this.$app.bookings.getForCalendar({
        dateFrom: this.selectedDate,
        dateTo: this.$moment(this.selectedDate).add(1, 'days').format('YYYY-MM-DD')
      })
    },
  },
  watch: {
    async isAllDay (v) {
      await this.loadData()
    },
    async selectedDate (v) {
      await this.loadData()
    }
  }
}
</script>

<style scoped>

</style>
