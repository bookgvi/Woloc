<template lang="pug">
  .q-pa-none
    filters-list(
      v-if="this.name !== 'noFilters'"
      :name="name"
    )
</template>

<script>
import FiltersList from '../Filters/FiltersList'
export default {
  name: 'SubMenu',
  components: { FiltersList },
  data () {
    return {
      name: ''
    }
  },
  created () {
    this.$eventBus.$on('setFilters', this.getName)
  },
  methods: {
    getName (name) {
      this.name = name
    }
  }

}
</script>

<style scoped lang="stylus">
</style>
