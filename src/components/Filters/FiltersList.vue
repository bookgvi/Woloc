<template lang="pug">
  .q-px-none
    q-separator
    .wrapper
      .row.items-center.q-py-sm.q-gutter-x-sm
        slot(
          :values="values"
          :onChange="onChange"
        )
        q-space
        q-btn(
          size="sm"
          outline
          color="secondary"
          no-caps
          label="Сбросить все"
          dense
        )
    q-separator
</template>

<script>
export default {
  name: 'filters-list',
  props: {
    name: String
  },
  computed: {
    values () {
      return this.$app.filters.values[this.name] || {}
    }
  },
  methods: {
    onChange (name, value) {
      this.$app.filters.setValue(this.name, name, value)
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
