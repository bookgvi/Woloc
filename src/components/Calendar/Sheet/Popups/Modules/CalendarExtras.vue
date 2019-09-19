<template lang="pug">
  .col-12.flex.justify-left.items-center
    q-option-group.text-body2(
      v-model="checkedExtras"
      :options="options"
      color="green"
      type="checkbox"
    ) {{ extrasComp }}
</template>

<script>
import sortBy from 'lodash/sortBy'

export default {
  name: 'CalendarExtras',
  data () {
    return {
      checkedExtras: []
    }
  },
  computed: {
    extrasComp () {
      return this.extrasChange()
    },
    options () {
      return sortBy(this.$app.extras.list, ['name']).map(({ name, price }) => ({
        label: name,
        value: name,
        price: price,
      }))
    }
  },
  methods: {
    extrasChange () {
      this.$emit('extrasChange', this.checkedExtras)
    }
  },
  props: ['startExtras'],
  watch: {
    'startEvent' (v) {
      this.checkedExtras = this.startExtras.slice()
    }
  }
}
</script>

<style scoped>

</style>
