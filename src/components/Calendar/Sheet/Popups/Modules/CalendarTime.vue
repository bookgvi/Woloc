<template lang="pug">
  .q-py-sm.text-body2
    .row.span.q-pb-sm Интервал, {{ duration }}
    .row.justify-around
      .col-5
        q-input(
          dense
          outlined
          v-model="range.min"
        )
      .col-5
        q-input(
          dense
          outlined
          v-model="range.max"
        )
    .row.text-body2.q-py-sm Зеленым отмечено свободное время.
    q-range.row.q-px-sm(
      v-model="range"
      :min="8"
      :max="24"
      color="green"
    ) {{ timeComp }}
</template>

<script>
export default {
  name: 'CalendarTime',
  data () {
    return {
      range: {
        min: 8,
        max: 24
      },
    }
  },
  created () {
    if (this.startTime) {
      this.range.min = this.startTime
    }
    if (this.endTime) {
      this.range.max = this.endTime
    }
  },
  computed: {
    duration () {
      const foo = this.range.max - this.range.min
      const bar = ([1, 21].includes(foo)) ? 'час' : ([2, 3, 4, 22, 23, 24].includes(foo))
        ? 'часа' : 'часов'
      return `${foo} ${bar}`
    },
    timeComp () {
      return this.timeChange()
    }
  },
  methods: {
    timeChange () {
      this.$emit('timeChange', {
        from: this.range.min,
        to: this.range.max
      })
    }
  },
  props: ['startTime', 'endTime']
}
</script>

<style scoped>

</style>
