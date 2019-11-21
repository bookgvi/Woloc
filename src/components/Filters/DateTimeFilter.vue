<template lang="pug">
  .dateTime
    .row
      .col
        q-btn.q-py-none(
          label="Дата/Время"
          @click="openFilter = true"
          dense
          no-caps
          flat
          style="border: 1px solid black;"
        )
          q-icon(name="event" class="cursor-pointer")
        q-popup-proxy(
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        )
          VueCtkDateTimePicker.q-pt-sm(
            v-model="dateRange"
            color="#81AEB6"
            format="YYYY-MM-DD"
            range
            no-shortcuts
            no-label
            inline
            :label="dateLabel"
          )
          q-btn(label="QQQ" @click="setDayTimeRange")
</template>

<script>
import { date } from 'quasar'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
export default {
  name: 'dateTime-filter',
  components: {
    VueCtkDateTimePicker
  },
  data: () => ({
    openFilter: true,
    dateRange: '',
    dateLabel: ''
  }),
  methods: {
    setDayTimeRange () {
      const currentPage = this.$route.path.split('/')[1]
      const startedAt = date.formatDate(this.dateRange.start, 'YYYY-MM-DD')
      const finishedAt = date.formatDate(this.dateRange.end, 'YYYY-MM-DD')
      this.$app.filters.setValue(currentPage, 'date[startedAt]', startedAt)
      this.$app.filters.setValue(currentPage, 'date[finishedAt]', finishedAt)
      this.$refs.qDateProxy.hide()
    }
  }
}
</script>
