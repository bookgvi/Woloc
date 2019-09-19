<template lang="pug">
  filter-select(
    :title="buttonTitle"
    selectAllLabel="Все цели"
    :models="models"
    :value="value"
    @change="event => onChange('events', event)"
  )
</template>

<script>
import FilterSelect from './FilterSelect'

export default {
  name: 'event-filter',
  components: { FilterSelect },
  props: {
    values: {
      type: Object,
    },
    onChange: Function
  },
  computed: {
    value () {
      return this.values.events || []
    },
    buttonTitle () {
      return `Цели ${this.value.length || ''}`
    },
    models () {
      return this.$app.events.list
    }
  }
}
</script>
