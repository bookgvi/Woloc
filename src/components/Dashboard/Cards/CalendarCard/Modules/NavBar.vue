<template lang="pug">
  q-card-section.row.col-12.items-center.q-py-none
    .col-6
      span.text-body2.q-py-md.q-pl-sm {{ dateFormatForLabel }}
    .row.col.justify-around
      q-btn.q-mr-xs(
        outline
        size="sm"
        label="Сегодня"
        no-caps
        @click="today"
        color="secondary"
      )
      q-btn-group(outline)
        q-btn.q-px-sm.q-mx-none(
          @click="datePrev"
          outline
          size="sm"
          icon="chevron_left"
          color="secondary"
        )
        q-separator(vertical, inset)
        q-btn.q-px-sm.q-mx-none(
          @click="dateNext"
          outline
          size="sm"
          icon="chevron_right"
          color="secondary"
        ) {{ dateComp }}
</template>

<script>

export default {
  name: 'NavBar',
  created () {
    this.date = this.$moment({ hour: 0 }).parseZone()
  },
  data () {
    return {
      date: this.startDate || '',
      from: '',
      to: ''
    }
  },
  computed: {
    dateFormatForLabel () {
      if (this.date === '') return '23 сентября, 2019'
      return `${this.$moment(this.date).format('D MMMM, YYYY')}`
    },
    dateComp () {
      return this.dateChange()
    }
  },
  methods: {
    datePrev () {
      this.date = this.$moment(this.date).subtract({ days: 1 })
    },
    today () {
      this.date = this.$moment()
    },
    dateNext () {
      this.date = this.$moment(this.date).add({ days: 1 })
    },
    dateChange () {
      this.$emit('dateChange', this.date)
    },
  },
  props: ['startDate'],
  watch: {
    startDate (v) {
      this.date = v
    },
  }
}
</script>

<style scoped>

</style>
