<template lang="pug">
  filter-select(
    :title="buttonTitle"
    :value="value"
    :isRange="true"
    @change="event => onChange('price', event)"
  )
    .row.text-body2.q-pt-md.q-px-md.justify-center {{ "Выберите ценовой диапазон" }}
</template>

<script>
import FilterSelect from './FilterSelect'

export default {
  name: 'price-filter',
  components: { FilterSelect },
  props: {
    values: {
      type: Object,
    },
    onChange: Function
  },
  data () {
    return {
      range: {
        min: 0,
        max: Infinity
      }
    }
  },
  computed: {
    value: {
      set (v) {
        this.range = Object.assign({}, v)
      },
      get () {
        return this.range
      }
    },
    buttonTitle () {
      const min = this.values.price.min
      const max = this.values.price.max
      if (max === Infinity) return 'Бронирований с ценой нет'
      if (min === max) return `Цена ${min}`
      return `Цена ${min}-${max}`
    },
  },
  watch: {
    values (v) {
      this.value = Object.assign({}, v.price)
    }
  }
}
</script>
