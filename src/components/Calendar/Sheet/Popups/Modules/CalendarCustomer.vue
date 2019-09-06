<template lang="pug">
  .fit.col-12.row.justify-around.items-center
    .col-12
      q-select.text-body2.text-weight-bold(
        outlined
        use-input
        label="Пользователь"
        :options="this.$app.customers.list"
        option-value="lastName"
        :option-label="opt => opt === null ? null : opt.lastName + ' ' + opt.firstName"
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
      customer: this.$app.customers.list[0]
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
    }
  },
  created: async function () {
    this.customers = this.$app.customers.list
  }
}
</script>

<style scoped>

</style>
