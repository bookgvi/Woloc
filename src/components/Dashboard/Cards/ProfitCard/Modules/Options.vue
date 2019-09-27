<template lang="pug">
  q-card-section
    q-option-group(
      v-model="checkedOptions"
      :options="options"
      type="checkbox"
    ) {{ checkedComp }}

</template>

<script>
export default {
  name: 'ProfitOptions',
  data () {
    return {
      checkedOptions: [0, 1, 2, 3]
    }
  },
  computed: {
    checkedComp () {
      return this.checkedChange()
    },
    options () {
      let arr = []
      this.$app.studios.list.forEach((item, index) => {
        const total = {
          label: `${item.name} - Предоплата`,
          value: index * 2
        }
        const prepayment = {
          label: `${item.name} - Бронирования`,
          value: index * 2 + 1
        }
        arr.push(total)
        arr.push(prepayment)
      })
      return arr
    }
  },
  methods: {
    checkedChange () {
      this.$emit('checkedChange', this.checkedOptions)
    }
  }
}
</script>

<style scoped>

</style>
