<template lang="pug">
  .fit.col-12.row.justify-around.items-center
    .col-12
      q-select.text-body2.text-weight-bold(
        outlined
        fill-input
        hide-selected
        stack-label
        @filter="filterFn"
        use-input
        label="Пользователь"
        :options="$app.customers.searched"
        :option-value="opt => opt === null ? '' : opt.fullName"
        :option-label="opt => opt === null ? '' : opt.fullName"
        v-model="customer"
        )
    .col-12
      q-input.text-body2.text-weight-bold(
        outlined
        stack-label
        readonly
        mask="#(###)###-##-##"
        label="Телефон"
        v-model="customer.phone"
      )
    .col-12
      q-input.text-body2.text-weight-bold(
        outlined
        stack-label
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
      customer: {
        fullName: '',
        phone: '',
        email: ''
      }
    }
  },
  created () {
    if (this.startCustomer) {
      this.customer = Object.assign(this.startCustomer)
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
      if (val.length < 1) {
        abort()
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.$app.customers.getForCalendar(needle)
      })
    }
  },
  props: ['startCustomer']
}
</script>

<style scoped>

</style>
