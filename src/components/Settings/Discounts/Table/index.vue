<template lang="pug">
  .table
    DataTable(
      title="Скидки"
      :getDialogTitle="({ id }) => `Скидка № ${id}`"
      :loadData="$app.discounts.getAll"
      :columns="columns"
      :details="details"
    )
      template(#row-dialog="props")
        editDiscount(v-bind="props" :allStudiosName="allStudiosName" :singleStudio="singleStudio" :rooms="rooms")

      template(#table-controls-append)
        q-btn.q-ml-md.text-white.bg-primary(label="Добавить скидку" no-caps)
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
import editDiscount from '../editDiscount/editDiscount'
export default {
  props: {
    singleStudio: Object,
    rooms: Array,
    allStudiosName: Array
  },
  name: 'promoTable',
  components: { DataTable, editDiscount },
  data: () => ({
    columns,
    details,
    dataset: {}
  }),
  methods: {
    showDialog (props) {
      this.dataset = props
    }
  }
}
</script>

<style scoped>
</style>
