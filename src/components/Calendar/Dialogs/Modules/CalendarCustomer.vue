<template lang="pug">
  q-card-section.col-12.row.justify-around.items-center(
  )
    .col-12
      q-select(
        outlined
        use-input
        label="Пользователь"
        :options="customers"
        option-value="lastName"
        :option-label="opt => opt === null ? null : opt.lastName + ' ' + opt.firstName"
        v-model="customer"
        )
    .col-12
      q-input(
        outlined
        readonly
        label="Телефон"
        v-model="customer.phone"
      )
    .col-12
      q-input(
        outlined
        readonly
        label="Эл. почта"
        v-model="customer.email"
      )
</template>

<script>

export default {
  name: 'CalendarCustomer',
  data () {
    return {
      customers: [],
      customer: ''
    }
  },
  created: async function () {
    this.customers = this.$app.customers.list
    this.customer = this.customers[0]
  }
}
</script>

<style scoped>

</style>
