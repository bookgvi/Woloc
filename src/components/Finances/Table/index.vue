<template lang="pug">
  .pageFinance
    DataTable(
      title="Финансы"
      :loadData="$app.finances.getAll"
      :filter="$app.filters.getValues('finances')"
      :getDialogTitle="() => 'Финансы'"
      :columns="columns"
      :details="details"
    )
      template(#title-append="props")
        .text-h6.inline-block.q-pl-md {{ props.amount }} ₽
      template(#table-controls-prepend="props")
        q-btn.bg-primary(no-caps text-color='white' label="Вывести на счет")
        q-btn.bg-primary.text-white.q-mr-md.q-pa-none
          q-icon(name="expand_more")
        q-popup-proxy.q-mt-md(auto-close)
          q-card(style="width: 180px;")
            .row
              .col
                q-btn.q-py-none.q-px-sm(
                  no-caps
                  flat
                  label="Отметить предоплату"
                  @click="isPrepayment = true"
                  style="width: 100%;"
                )
            .row
              .col
                q-btn.q-py-none.q-px-sm(
                  no-caps
                  label="Сделать возврат"
                  @click="isRefund = true"
                  style="width: 100%;"
                )
    q-dialog(v-model="isPrepayment")
      q-card(style="min-width: 640px;")
        prepayment
    q-dialog(v-model="isRefund")
      q-card(style="min-width: 640px;")
        refund
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
import refund from '../Actions/refundModal'
import prepayment from '../Actions/prepaymentModal'

export default {
  name: 'FinancesTable',
  components: {
    DataTable,
    refund,
    prepayment
  },
  data: () => ({
    columns,
    details,
    isRefund: false,
    isPrepayment: false
  })
}
</script>

<style scoped>
</style>
