<template lang="pug">
  DataTable(
    title="Документы"
    :columns="columns"
    :details="details"
    :getDialogTitle="() => 'Документы'"
    :loadData="$app.documents.getAll"
  )
    template(#row-controls="props")
      q-btn(flat icon-right="get_app" title="Скачать" @click="handle(props.row.link)")
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
import axios from 'axios'
export default {
  name: 'DocumentsTable',
  components: { DataTable },
  data: () => ({
    columns,
    details
  }),
  methods: {
    async handle (url) {
      try {
        await axios(url)
      } catch (err) {}
    }
  }
}
</script>

<style scoped>
</style>
