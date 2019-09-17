<template lang="pug">
  filter-select(
    :title="buttonTitle"
    :options="options"
    :value="value"
    @change="event => onChange('rating', event)"
  )
</template>

<script>
import range from 'lodash/range'
import FilterSelect from './FilterSelect'

export default {
  name: 'rating-filter',
  components: { FilterSelect },
  props: {
    values: {
      type: Object,
    },
    onChange: Function
  },
  computed: {
    value () {
      return this.values.rating || []
    },
    options () {
      return range(1, 6).map(i => `${i}`).map(value => ({ value, label: value }))
    },
    buttonTitle () {
      return `Рейтинг ${this.value.join(',')}`
    },
  }
}
</script>
