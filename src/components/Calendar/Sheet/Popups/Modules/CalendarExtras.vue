<template lang="pug">
  .col-12.flex.justify-left.items-center
    q-option-group.text-body2(
      v-model="checkedExtras"
      :options="extras"
      color="green"
      type="checkbox"
    ) {{ extrasComp }}
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
  },
  computed: {
    extrasComp () {
      return this.extrasChange()
    }
  },
  methods: {
    extrasChange () {
      this.$emit('extrasChange', this.checkedExtras)
    }
  }
}
</script>

<style scoped>

</style>
