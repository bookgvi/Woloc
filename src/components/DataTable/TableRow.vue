<template lang="pug">
  q-tr(:class="{ disabled }")
    q-td(
      :key="name"
      v-for="{name, value, active} of cols"
      v-bind="getColProps(name)"
      @click.native="active && $emit('toggleDialogRow', row.id)"
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
          span(v-if="!controlsAreVisible(row)" :title="value") {{value}}
      template(v-else-if="name === 'rating'")
        i(v-for="(item, i) in 5" class="fa-star" :class="i < value ? 'fas' : 'far' ")
      template(v-else-if="name === 'controls'")
        .buttons.absolute
          transition(
            enter-active-class="animated fadeInRight"
            leave-active-class="animated fadeOutRight"
          )
            .inline-block(v-if="controlsAreVisible(row)")
              slot(:row="row")
          q-btn(
            flat
            round
            icon="more_vert"
            @click="$emit('toggleControls', row.id)"
            :color="controlsAreVisible(row) ? 'primary' : undefined"
            :disable="disabled"
          )
      template(v-else-if="name === 'status'")
        .inline-block(v-if="!value" title="13 ок. 20:47") Ожидает зачисление
      template(v-else-if="name === 'file'")
          slot
      template(v-else) {{ value }}
</template>

<script>
export default {
  name: 'TableRow',
  inheritAttrs: false,
  props: {
    row: Object,
    cols: Array,
    colsMap: Object,
    controlsRowId: Number,
    toggleControls: Function,
    dialogRowId: Number,
    disabled: Boolean,
  },
  methods: {
    controlsAreVisible (row) {
      return this.controlsRowId === row.id
    },
    getColProps (name) {
      const { active, classes, __tdClass, style } = this.colsMap[name]
      const classNames = [name]
      if (active) classNames.push('active')
      if (classes) classNames.push(classes)
      if (__tdClass) classNames.push(__tdClass)

      return {
        class: classNames,
        style
      }
    }
  },
}
</script>

<style lang="stylus">
  tr.disabled
    opacity: .2
  .q-table tbody tr
    .active
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
    .rating
      color $primary
      letter-spacing 5px
    .controls
      position relative
      .buttons
        padding-top 4px
        height 100%
        top 0
        right 0
        font-size 1.8em
</style>
