<template lang="pug">

  DataTable(
    title="Возврат"
    :loadData="$app.refunds.getAll"
    :getDialogTitle="() => 'Возврат'"
    :filter="$app.filters.getValues('refunds')"
    :columns="columns"
    :details="details"
    :isRowDisabled="({ status }) => !status"
  )
    template(#row-controls)
      q-btn(flat round icon="block" no-caps title="Отменить")
      q-btn(flat round icon="thumb_up" no-cpas title="Подтвердить")

</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
import studios from '../../../api/studios'
export default {
  name: 'RefundsTable',
  components: { DataTable },
  data: () => ({
    columns,
    details
  }),
  created () {
    this.filter()
  },
  methods: {
    async filter () {
      let filter = {}
      let { studio } = this.$app.filters.getValues('refunds')
      const { items } = await studios.getAll().then(resp => resp.data)
      if (!studio) {
        let [{ rooms }] = items.filter(item => item.id === items[0].id)
        rooms = rooms.map(item => item.id)
        filter = Object.assign({}, {
          studio: items[0].id,
          rooms: rooms
        })
        this.$app.filters.setValue('refunds', 'studio', filter.studio)
        this.$app.filters.setValue('refunds', 'rooms', filter.rooms)
      }
    }
  }
}
</script>

<style scoped>
</style>
