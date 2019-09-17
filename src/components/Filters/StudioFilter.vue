<template lang="pug">
  filter-select(
    type="radio"
    :title="buttonTitle"
    :models="models"
    :value="value"
    @change="onInputChange"
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
    onChange: Function,
  },
  computed: {
    value () {
      return this.values.studio
    },
    models () {
      return this.$app.studios.list
    },
    buttonTitle () {
      const studio = this.$app.studios.getFiltered(this.values)

      return studio ? studio.name : 'Студия'
    },
  },
  methods: {
    onInputChange (event) {
      this.onChange('studio', event)
      this.onChange('rooms', [])
    }
  }
}
</script>
