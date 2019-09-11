<script>
import RowDialog from '../../DataTable/RowDialog'

export default {
  name: 'BookingsDialog',
  components: { RowDialog },
  props: {
    getTitle: Function,
    row: {
      type: Object,
      default: () => ({}),
    },
    details: Array,
    readonly: Boolean,
  },
  data () {
    return {
      payment: [
        { name: '4ч - 1200', value: 4800 },
        { name: 'Покраска циклорамы', value: 500 },
        { name: 'Набор ванны водой', value: 300 },
        { name: 'Предоплата 100%', value: 4800 },
        { name: 'Итого', value: 5600 },
      ]
    }
  }
}
</script>

<template lang="pug">
  RowDialog(v-bind="$props")
    .row.q-mt-md
      .text-h6.text-bold Оплата

    q-input(
      v-for="{ name, value } of payment"
      input-class="text-right"
      readonly
      :label="`${name}, р.`"
      :value="value"
      :key="name"
    )

    .row.q-mt-md
      .text-h6.text-bold Комментарий
      q-input(
        type="textarea"
        borderless
        readonly
        :value="row.comment"
      )

    template(#actions)
      q-btn(icon="close" outline v-close-popup)
      q-btn(icon="delete" outline)
      q-btn.col-grow(label="Редактировать в календаре" color="primary" unelevated)
</template>
