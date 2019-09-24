<template lang="pug">
  q-card-section
    q-option-group(
      v-model="checkedOptions"
      :options="options"
      type="checkbox"
    )

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
    options () {
      let arr = []
      this.$app.studios.list.forEach(item => {
        const total = {
          label: `${item.name} - Предоплата`,
          value: `${item.name} - Предоплата`
        }
        const prepayment = {
          label: `${item.name} - Бронирования`,
          value: `${item.name} - Бронирования`
        }
        arr.push(total)
        arr.push(prepayment)
      })
      return arr
    }
  }
}
</script>

<style scoped>

</style>
