<script>
import icons from 'src/common/eventType/icons'

export default {
  name: 'table-row',
  props: {
    row: Object,
    cols: Array,
    openedRowId: Number,
    toggleOpenedRow: Function,
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
        q-icon(:name='getEventIcon(value)')
      template(v-else-if="name === 'isPaid'")
        q-icon(size="sm" name="check" color="green" v-if="value")
      template(v-else-if="name === 'comment'")
        span(:title="value") {{value}}
      template(v-else-if="name === 'actions'")
        .buttons.absolute
          transition(
            enter-active-class="animated fadeInRight"
            leave-active-class="animated fadeOutRight"
          )
            .inline-block(v-if="openedRowId === row.id")
              q-btn(flat round icon="comment")
              q-btn(flat round icon="delete")
              q-btn(flat round icon="edit")
              q-btn(flat round icon="thumb_up")
          q-btn(
            flat
            round
            icon="more_vert"
            @click="$emit('openRow', row.id)"
            :color="openedRowId === row.id ? 'primary' : undefined"
          )
      template(v-else) {{ value }}
</template>

<style lang="stylus">
tr.removed
  opacity: .2
.q-table tbody
  .room
    .q-chip
      width 100px
      div
        width 100%
        overflow hidden
        text-overflow ellipsis
  .eventType
    font-size 1.6em
  .comment
    max-width 100px
    overflow hidden
    text-overflow ellipsis
  .actions
    position relative
    .buttons
      padding-top 4px
      height 100%
      top 0
      right 0
      font-size 1.8em
</style>
