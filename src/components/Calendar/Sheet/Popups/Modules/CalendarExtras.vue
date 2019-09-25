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
  created () {
    this.checkedExtras = this.startExtras.map(item => item.name)
  },
  data () {
    return {
      checkedExtras: []
    }
  },
  computed: {
    extrasComp () {
      return this.extrasChange()
    },
    chExtras () {
      return this.checkedExtras.map(item => {
        return Object.assign({ name: item, price: 400 })
      })
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
      this.$emit('extrasChange', this.chExtras)
    }
  },
  props: ['startExtras'],
}
</script>

<style scoped>

</style>
