<template lang="pug">
  .q-pa-none
    q-card
      q-card-section
        span.row.text-bold.text-body1.q-pt-md.q-pl-sm {{ "Финансы"}}
      q-card-section
        q-markup-table.justify-center
          thead
          tbody
            tr
              td На счету:
              td 18600
            tr
              td Ожидается:
              td + 2500

</template>

<script>

export default {
  name: 'FinancesCard',
  created () {
    this.date = this.$moment({ hour: 0 }).parseZone()
  },
  data () {
    return {
      date: '',
      isAllDay: false,
      studio: (this.$app.studios.list.length > 0) ? this.$app.studios.list[0].id : 0
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
