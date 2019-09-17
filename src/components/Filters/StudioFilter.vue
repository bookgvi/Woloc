<template lang="pug">
  filter-select(
    type="radio"
    :title="buttonTitle"
    :models="models"
    :value="value"
    @change="event => onChange('studio', event)"
  )
</template>

<script>
import FilterSelect from './FilterSelect'

export default {
  name: 'studio-filter',
  components: { FilterSelect },
  props: {
    values: {
      type: Object,
    },
    onChange: Function
  },
  computed: {
    value () {
      return this.values.studio
    },
    models () {
      return this.$app.studios.list
    },
    buttonTitle () {
      const studio = this.models.find(({ id }) => id === this.value)

      return studio ? studio.name : 'Студия'
    },
  }
}
</script>
