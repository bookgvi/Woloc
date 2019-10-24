<template lang="pug">
  .bookings
    data-table(
      title="Бронирования"
      :getDialogTitle="({ id }) => `Бронь ${id}`"
      :loadData="$app.bookings.getAll"
      :filter="$app.filters.getValues('bookings')"
      :columns="columns"
      :details="details"
      :isRowDisabled="({ status }) => status === disabledStatus"
      @hTooltip="hTooltip"
    )
      template(#row-dialog="props")
        bookings-dialog(v-bind="props")

      template(#row-controls="props")
        q-btn(flat round icon="comment" title="Открыть чат")
        q-btn(flat round icon="delete" title="Удалить")
        q-btn(flat round icon="edit" @click="props.toggleDialogRow(props.row.id)" title="Редактировать")
        q-btn(flat round icon="thumb_up")
    .div(:style="position" v-if="isTooltip")
      span.bg-primary.text-white.q-pa-md(v-for="item in extras" :key="item.id") {{ item.name }} {{ item. price }}
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
import BookingsDialog from './BookingsDialog'
import { BOOKING_STATUSES } from 'src/common/constants'

export default {
  name: 'bookings-table',
  components: { DataTable, BookingsDialog },
  data () {
    return {
      columns,
      details,
      disabledStatus: BOOKING_STATUSES.CANCELED,
      isTooltip: true,
      position: {
        position: 'fixed',
        top: 0,
        left: 0,
        fontSize: '0.8rem',
        width: '600px',
        opacity: '0.5'
      },
      extras: []
    }
  },
  methods: {
    hTooltip (extras, event) {
      if (!extras) {
        this.isTooltip = false
      }
      this.extras = extras
      this.position.left = event.clientX + 'px'
      this.position.top = event.clientY + 'px'
      this.isTooltip = true
    }
  }
}
</script>
