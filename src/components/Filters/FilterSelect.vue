<template lang="pug">
  q-btn.q-py-none.q-px-sm(
    outline
    color="secondary"
    no-caps
    :label="title"
    dense
  )
    q-popup-proxy(
    )
      q-option-group.text-body2.q-pa-md(
        color="green"
        type="checkbox"
        @input="$emit('change', $event)"
        :options="options"
        :value="value"
      )
</template>

<script>
export default {
  name: 'filter-select',
  props: {
    title: String,
    options: Array,
    value: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
