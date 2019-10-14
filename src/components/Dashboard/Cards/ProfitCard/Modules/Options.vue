<template lang="pug">
  q-card-section
    q-markup-table.q-pb-md(
      style="min-width: 350px"
      wrap-cells
      separator="none"
      dense
      flat
    )
    thead.text-left
      tr
        th(style="width: 5%")
        th(style="width: 90%")
        th(style="width: 5%")
    tbody
      tr(
        v-for="(item, index) in options"
        :key="index"
      )
        td
          q-icon.q-mr-md(
            :style="{color: item.color}"
            name="far fa-circle"
          )
        td
          span.text-caption {{ item.label }}
        td
          q-checkbox(
            v-model="checkedOptions"
            :val="index"
          ) {{ checkedComp }}

</template>

<script>
export default {
  name: 'ProfitOptions',
  data () {
    return {
      checkedOptions: []
    }
  },
  computed: {
    checkedComp () {
      return this.checkedChange()
    },
  },
  methods: {
    checkedChange () {
      this.$emit('checkedChange', this.checkedOptions)
    }
  },
  props: {
    options: Array
  },
  watch: {
    options: {
      handler (v) {
        this.checkedOptions = [...Array(v.length).keys()]
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
