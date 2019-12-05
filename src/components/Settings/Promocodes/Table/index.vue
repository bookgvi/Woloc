<template lang="pug">
  .table.wrapper.wrapper--header
    DataTable(
      title="Промокоды"
      :loadData="$app.promocodes.getAll"
      :filter="$app.filters.getValues('settings')"
      :columns="columns"
      @toggleDialogRow="toggleDialogRow"
    )
      template(#table-controls-append)
        q-btn.q-ml-md.text-white.bg-primary(label="Добавить промокод" no-caps)
</template>

<script>
import columns from './columns'
import DataTable from 'components/DataTable'
import editPromocode from '../editPromoModal/editPromo'
export default {
  props: {
    singleStudio: Object,
    rooms: Array,
    allStudiosName: Array
  },
  name: 'promoTable',
  components: { DataTable, editPromocode },
  data: () => ({
    columns,
    editPromo: true,
    dataset: {}
  }),
  methods: {
    showDialog (props) {
      this.editPromo = true
      this.dataset = props
    }
  }
}
</script>

<style scoped>
</style>
