<template lang="pug">
  .table
    DataTable(
      title="Промокоды"
      :loadData="$app.promo.getAll"
      :columns="columns"
      :details="details"
    )
      template(#row-dialog="props")
        editPromocode(v-bind="props")
      template(#table-controls-append)
        q-btn.q-ml-md.text-white.bg-primary(label="Добавить промокод" no-caps)
    q-dialog(v-model="editPromo" persistent)
      q-card
        q-card-section
          editPromocode(:singleStudio="singleStudio" :rooms="rooms" :dataset="dataset" @hide="editPromo = false")
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
import editPromocode from '../editPromoModal/editPromo'
export default {
  props: {
    singleStudio: Object,
    rooms: Array
  },
  name: 'promoTable',
  components: { DataTable, editPromocode },
  data: () => ({
    columns,
    details,
    editPromo: false,
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
