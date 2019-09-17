<template lang="pug">
  filter-select(
    :title="buttonTitle"
    :models="models"
    :value="value"
    @change="event => onChange('rooms', event)"
  )
</template>

<script>
import FilterSelect from './FilterSelect'

export default {
  name: 'rooms-filter',
  components: { FilterSelect },
  props: {
    values: {
      type: Object,
    },
    onChange: Function
  },
  computed: {
    value () {
      return this.values.rooms || []
    },
    buttonTitle () {
      return `Залы ${this.value.length || ''}`
    },
    models () {
      return this.$app.rooms.getAvailable(this.values)
    }
  }
}
</script>
