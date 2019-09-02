<script>
import icons from 'src/common/eventType/icons'

export default {
  name: 'table-row',
  props: {
    row: Object,
    cols: Array,
  },
  methods: {
    getEventIcon (eventType) {
      return icons.find(({ name }) => name === eventType).icon
    },
  }
}
</script>

<template lang="pug">
  q-tr(:class="row.removed && 'removed'")
    q-td(
      v-for="{name, value} of cols"
      :key="name"
      :class="name"
    )
      template(v-if="name === 'room'")
        q-chip(dense square :color="value.color" :title="value.name") {{value.name}}
      template(v-else-if="name === 'eventType'")
        q-icon(size="sm" :name='getEventIcon(value)')
      template(v-else-if="name === 'isPaid'")
        q-icon(size="sm" name="check" color="green" v-if="value")
      template(v-else-if="name === 'comment'")
        span(:title="value") {{value}}
      template(v-else-if="name === 'actions'")
        i(class="fas fa-ellipsis-v")
      template(v-else) {{ value }}
</template>

<style lang="stylus">
tr.removed
  opacity: .2
.room
  .q-chip
    width 100px
    div
      width 100%
      overflow hidden
      text-overflow ellipsis

.comment
  max-width 100px
  overflow hidden
  text-overflow ellipsis
</style>
