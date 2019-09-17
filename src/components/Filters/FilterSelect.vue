<template lang="pug">
  q-btn.q-py-none.q-px-sm(
    outline
    no-caps
    dense
    :label="title"
    :disabled="disabled"
  )
    q-popup-proxy(
    )
      q-option-group.text-body2.q-pa-md(
        color="green"
        :type="type"
        :options="options"
        :value="value"
        @input="$emit('change', $event)"
      )
</template>

<script>
export default {
  name: 'filter-select',
  props: {
    title: String,
    models: Array,
    type: {
      type: String,
      default: 'checkbox'
    },
    value: {
      validator (prop) {
        return prop === null || prop instanceof Array || typeof prop === 'number'
      },
    },
  },
  computed: {
    options () {
      return this.models.map(({ id, name }) => ({
        value: id,
        label: name,
      }))
    },
    disabled () {
      return !this.options.length
    }
  }
}
</script>
