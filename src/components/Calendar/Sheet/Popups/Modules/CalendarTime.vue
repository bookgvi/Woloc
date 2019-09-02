<template lang="pug">
  .q-py-md
    .text.text_small Интервал, {{ duration }}
    .row
      .col-6
        q-input(
          v-model="range.min"
        )
      .col-6
        q-input(
          v-model="range.max"
        )
    .col-12.row.text.text_extrasmall Зеленым отмечено свободное время.
    q-range(
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
  }
}
</script>

<style scoped>

</style>
