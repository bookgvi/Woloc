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
        min: this.values.price.min,
        max: this.values.price.max
      }
    }
  },
  computed: {
    rangeBorders () {
      if (!this.$app.bookings || !this.$app.bookings.calendarPriceFilter) {
        return {
          min: 0,
          max: Infinity
        }
      }
      return {
        min: this.$app.bookings.calendarPriceFilter.min,
        max: this.$app.bookings.calendarPriceFilter.max
      }
    },
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
    rangeBorders: {
      handler (v) {
        if (this.value.min > v.min && this.value.max < v.max) return
        let range = {
          min: (this.value.min > v.min) ? this.value.min : v.min,
          max: (this.value.max < v.max) ? this.value.max : v.max
        }
        this.value = Object.assign({}, range)
        this.values.price = Object.assign({}, range)
      },
      deep: true
    }
  }
}
</script>
