<script>
export default {
  name: 'rowDetails',
  props: {
    row: Object,
    opened: Boolean,
    sections: Array,
  },
  methods: {
    getSectionName (section) {
      if (typeof section.name === 'function') return section.name(this.row)

      return section.name
    },
    getFieldValue (field) {
      const value = typeof field.field === 'function'
        ? field.field(this.row)
        : this.row[field.field]

      return (typeof field.format === 'function')
        ? field.format(value, this.row)
        : value
    }
  },
}
</script>

<template lang="pug">
  q-dialog(v-model="opened")
    q-card
      template(v-for="(section, i) of sections")
        q-card-section.row.items-center
          .text-h6 {{ getSectionName(section) }}
          q-space
          q-btn(v-if="!i" icon="close" flat round dense v-close-popup)
        q-card-section
          q-input(
            v-for="field of section.fields"
            :label="field.label"
            :value="getFieldValue(field)"
            :input-class="field.inputType !== 'textarea' ? 'text-right' : undefned"
            :type="field.inputType"
          )
</template>

<style lang="stylus">
.q-card
  width 620px
.q-field__label
  transform none !important
  top 0
  right 0 !important
  line-height 24px
  padding-top 24px
  padding-bottom 8px
</style>
