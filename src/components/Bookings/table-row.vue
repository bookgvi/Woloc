<script>
export default {
  name: 'table-row',
  inheritAttrs: false,
  data () {
    return {
      clickableCols: ['id', 'customer']
    }
  },
  props: {
    row: Object,
    cols: Array,
    actionsRowId: Number,
    toggleActionsRow: Function,
    dialogRowId: Number,
    toggleDialogRow: Function,
  },
  methods: {
    actionsAreVisible (row) {
      return this.actionsRowId === row.id
    },
    isClickable (name) {
      return this.clickableCols.includes(name)
    }
  }
}
</script>

<template lang="pug">
  q-tr(:class="row.removed && 'removed'")
    q-td(
      v-for="{name, value} of cols"
      :key="name"
      :class="{ [name]: true, clickable: isClickable(name) }"
      @click.native="isClickable(name) && $emit('toggleDialog', row.id)"
    )
      template(v-if="name === 'room'")
        q-chip(dense square :color="value.color" :title="value.name") {{value.name}}
      template(v-else-if="name === 'eventType'")
        q-icon(:name='value.icon')
      template(v-else-if="name === 'isPaid'")
        q-icon(size="sm" name="check" color="green" v-if="value")
      template(v-else-if="['comment', 'promo'].includes(name)")
        transition(
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        )
          span(v-if="!actionsAreVisible(row)" :title="value") {{value}}
      template(v-else-if="name === 'actions'")
        .buttons.absolute
          transition(
            enter-active-class="animated fadeInRight"
            leave-active-class="animated fadeOutRight"
          )
            .inline-block(v-if="actionsAreVisible(row)")
              q-btn(flat round icon="comment")
              q-btn(flat round icon="delete")
              q-btn(flat round icon="edit" @click="$emit('toggleDialog', row.id)")
              q-btn(flat round icon="thumb_up")
          q-btn(
            flat
            round
            icon="more_vert"
            @click="$emit('toggleActions', row.id)"
            :color="actionsAreVisible(row) ? 'primary' : undefined"
          )
      template(v-else) {{ value }}
</template>

<style lang="stylus">
tr.removed
  opacity: .2
.q-table tbody tr
  .clickable
    cursor: pointer
  .room .q-chip
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
