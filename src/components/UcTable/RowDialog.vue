<script>
export default {
  name: 'RowDialog',
  props: {
    getTitle: Function,
    row: {
      type: Object,
      default: () => ({}),
    },
    details: Array,
    readonly: Boolean,
  },
  methods: {
    getFieldValue (field) {
      const value = typeof field.field === 'function'
        ? field.field(this.row)
        : this.row[field.field]

      return (typeof field.format === 'function')
        ? field.format(value, this.row)
        : value
    }
  },
  computed: {
    title () {
      return this.getTitle(this.row)
    }
  }
}
</script>

<template lang="pug">
  q-dialog(:value="!!row.id" @hide="$emit('toggleDialogRow', row.id)")
    q-card
      q-card-section
        .row
          .text-h6 {{title}}
          q-space
          q-btn(icon="close" flat round dense v-close-popup)

      q-card-section.scroll(style="max-height: 70vh")
        template(v-for="(group, i) of details")
          .row.q-mt-md(v-if="group.name")
            .text-h6 {{ group.name }}

          q-input(
            v-for="field of group.fields"
            :key="field.id"
            :label="field.label"
            :value="getFieldValue(field)"
            :borderless="field.inputType === 'textarea'"
            :input-class="{ 'text-right': field.inputType !== 'textarea' }"
            :type="field.inputType"
            :readonly="readonly"
          )

      q-card-actions.q-pa-md
        slot(name="actions")
</template>

<style lang="stylus">
.q-card
  width 620px
.q-field--float
  .q-field__label
    transform none
    top 0
    right 0
    line-height 24px
    padding-top 24px
    padding-bottom 8px

.q-field--standard.q-field--readonly
  .q-field__control:before
    border-bottom-style solid

.q-card__actions
  button
    min-width auto !important
</style>
