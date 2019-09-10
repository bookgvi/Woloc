<script>
import RowDialog from 'components/UcTable/RowDialog'

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
}
</script>

<template lang="pug">
  RowDialog(v-bind="$props")
    template(#actions)
      q-btn(icon="close" outline v-close-popup)
      q-btn(icon="delete" outline)
      q-btn.col-grow(label="Редактировать в календаре" color="primary" unelevated)
</template>
