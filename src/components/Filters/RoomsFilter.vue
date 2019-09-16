<template lang="pug">
  filter-select(
    :title="buttonTitle"
    :options="options"
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
    studio () {
      return this.$app.studios.studio
    },
    options () {
      if (this.$app.studios.list.length === 0) return []
      const arr = this.$app.studios.getRoomsByStudio(this.studio).map((item) => {
        const room = Object.assign({}, {
          value: item.id,
          label: item.name,
        })
        return room
      })
      return arr
    }
  }
}
</script>

<style scoped>

</style>
