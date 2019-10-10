<template lang="pug">
  q-card-section
    q-list
      q-item
        q-item-section(avatar)
        q-item-section.text-bold
          span {{ "Зал" }}
        q-item-section.text-bold
          span {{ "%" }}
        q-item-section(side).text-bold
          span {{ "р." }}
      q-item(
        v-for="(point, index) in chartData"
        :key="index"
      )
        q-item-section(avatar)
          q-icon(
            :style="{color: point.color}"
            name="far fa-circle"
          )
        q-item-section
          span {{ point.name }}
        q-item-section
          span {{ point.percent }}
        q-item-section(side)
          span {{ point.total }}

</template>

<script>

export default {
  name: 'WorkloadOptions',
  data () {
    return {
      checkedOptions: [],
    }
  },
  computed: {
    chartData () {
      if (!this.options) {
        return [{
          name: 'Зал',
          total: 100,
          percent: 100,
          color: 'black'
        }]
      }
      return this.options.slice()
    },
  },
  props: {
    options: Array,
  }
}
</script>

<style scoped>

</style>
