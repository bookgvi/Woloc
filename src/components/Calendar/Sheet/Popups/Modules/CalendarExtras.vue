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
// import sortBy from 'lodash/sortBy'

export default {
  name: 'CalendarExtras',
  data () {
    return {
      checkedExtras: this.startExtras
    }
  },
  created () {
    this.checkedExtras = Object.assign([], this.startExtras)
  },
  computed: {
    extrasComp () {
      return this.extrasChange()
    },
    options () {
      return this.$app.extras.list.map(({ name }) => ({
        label: name,
        value: name,
      }))
    }
  },
  methods: {
    extrasChange () {
      this.$emit('extrasChange', this.checkedExtras.slice())
    }
  },
  props: {
    startExtras: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  watch: {
    'startExtras' (v) {
      // this.checkedExtras = Object.assign(this.checkedExtras, v)
      console.log(65778, this.checkedExtras, this.startExtras)
    }
  }
}
</script>

<style scoped>

</style>
