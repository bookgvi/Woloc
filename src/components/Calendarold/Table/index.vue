<template lang="pug">
  .calendar-table
    q-markup-table(
      flat
      bordered
      :separator="separator"
    )
        q-tr
          q-th.text-left Время
          q-th.text-left {{weekLabels[0]}}
          q-th.text-left {{weekLabels[1]}}
          q-th.text-left {{weekLabels[2]}}
          q-th.text-left {{weekLabels[3]}}
          q-th.text-left {{weekLabels[4]}}
          q-th.text-left {{weekLabels[5]}}
          q-th.text-left {{weekLabels[6]}}
        q-tr
          q-td.text-left 08:00 - 09:00
          q-td.text-left
          q-td.text-left
          q-td.text-left
          q-td.text-left
          q-td.text-left
          q-td.text-left
          q-td.text-left
        q-tr
          q-td.text-left 09:00 - 10:00
          q-td.text-left
          q-td.text-left
          q-td.text-left
          q-td.text-left
          q-td.text-left
          q-td.text-left
          q-td.text-left
</template>

<script>

export default {
  name: 'CalendarTable',
  data () {
    return {
      separator: 'cell',
      week: [],
      stamp: new Date()
    }
  },
  computed: {
    weekLabels () {
      const currentDayOfWeek = this.stamp.getDay()
      const today = this.stamp.getDate()
      const monday = today - currentDayOfWeek + 1
      return [
        `ПН ${monday}`,
        `ВТ ${monday + 1}`,
        `СР ${monday + 2}`,
        `ЧТ ${monday + 3}`,
        `ПТ ${monday + 4}`,
        `СБ ${monday + 5}`,
        `ВС ${monday + 6}`
      ]
    }
  },
  methods: {
    nextWeek () {
      this.stamp.setDate(this.stamp.getDate() + 7)
    },
    prevWeek () {
      this.stamp.setDate(this.stamp.getDate() - 7)
    },
  }
}
</script>

<style scoped>

</style>
