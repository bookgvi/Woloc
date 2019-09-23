<template lang="pug">
  .wrapper
    .row.items-center.q-py-sm.q-gutter-x-sm
      slot(
        :values="values"
        :onChange="onChange"
      )
      q-space
      q-btn.q-py-none.q-px-sm(
        outline
        no-caps
        label="Сбросить все"
        dense
        :disable="isNotFiltered"
        @click="onReset"
      )
</template>

<script>
export default {
  name: 'ModulesGrid',
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
