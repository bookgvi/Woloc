<template lang="pug">
  .fit.col-12.row.justify-around.items-center
    .col-12
      q-select.text-body2.text-weight-bold(
        outlined
        fill-input
        hide-selected
        @filter="filterFn"
        use-input
        label="Пользователь"
        :options="customers"
        :option-value="opt => opt === null ? null : opt.fullName"
        :option-label="opt => opt === null ? null : opt.fullName"
        v-model="customer"
        )
    .col-12
      q-input.text-body2.text-weight-bold(
        outlined
        readonly
        mask="#(###)###-##-##"
        label="Телефон"
        v-model="customer.phone"
      )
    .col-12
      q-input.text-body2.text-weight-bold(
        outlined
        readonly
        label="Эл. почта"
        v-model="customer.email"
      ) {{ customerComp }}
</template>

<script>

export default {
  name: 'CalendarCustomer',
  data () {
    return {
      customer: this.$app.customers.forCalendar[0],
      customers: this.$app.customers.forCalendar
    }
  },
  computed: {
    customerComp () {
      return this.customerChange()
    }
  },
  methods: {
    customerChange () {
      this.$emit('customerChange', this.customer)
    },
    filterFn (val, update, abort) {
      if (val.length < 0) {
        abort()
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.customers = this.$app.customers.forCalendar.filter(v => v.fullName.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>

<style scoped>

</style>
