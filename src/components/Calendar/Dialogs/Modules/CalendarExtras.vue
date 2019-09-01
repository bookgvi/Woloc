<template lang="pug">
  .col-12.flex.justify-left.items-center
    q-option-group(
      v-model="checkedExtras"
      :options="extras"
      color="green"
      type="checkbox"
    )
</template>

<script>
export default {
  name: 'CalendarExtras',
  data () {
    return {
      extras: [],
      checkedExtras: []
    }
  },
  created: async function () {
    this.extras = this.$app.extras.list.map((item) => {
      const extra = {
        value: item.name,
        label: item.name,
        price: item.price
      }
      return extra
    })
  }
}
</script>

<style scoped>

</style>
