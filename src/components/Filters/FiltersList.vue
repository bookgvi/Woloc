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
          no-caps
          label="Сбросить все"
          dense
          :disable="isNotFiltered"
          @click="onReset"
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
      return this.$app.filters.getValues(this.name)
    },
    isNotFiltered () {
      return !Object.values(this.values).length
    }
  },
  methods: {
    onChange (name, value) {
      this.$app.filters.setValue(this.name, name, value)
    },
    onReset () {
      this.$app.filters.reset(this.name)
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
