<template lang="pug">
  q-btn.q-py-none.q-px-sm(
    outline
    no-caps
    dense
    :label="title"
    :disabled="disabled"
  )
    q-popup-proxy(ref="QPopupProxy")
      slot

      q-option-group.text-body2.q-px-md.q-pt-md(
        color="black"
        :type="type"
        :options="listOptions"
        v-model="currentValue"
      )
      .text-body2.q-px-md
        q-checkbox(
          v-if="selectAllLabel"
          :label="selectAllLabel"
          :value="selectAllState"
          @input="toggleSelectAll"
        )
      q-btn-group.q-pa-md(outline)
        q-btn.q-mr-md(
          label="Отменить"
          no-caps
          :style="{ border: '#f0f0f0 solid 1px' }"
          @click="onReset"
        )
        q-btn(
          label="Применить"
          color="primary"
          no-caps
          @click="onApply"
        )
</template>

<script>
export default {
  name: 'filter-select',
  data: () => ({
    currentValue: [],
  }),
  created () {
    this.currentValue = this.value
  },
  watch: {
    value (value) {
      this.currentValue = value
    }
  },
  props: {
    title: String,
    selectAllLabel: String,
    models: Array,
    options: Array,
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
    listOptions () {
      return this.options || this.models.map(({ id, name }) => ({
        value: id,
        label: name,
      }))
    },
    disabled () {
      return !this.listOptions.length
    },
    selectAllState () {
      const { length } = this.currentValue

      if (!length) return false
      if (length === this.listOptions.length) return true

      return null
    }
  },
  methods: {
    hidePopup () {
      this.$refs.QPopupProxy.hide()
    },
    onApply () {
      if (this.currentValue !== this.value) {
        this.$emit('change', this.currentValue)
      }

      this.hidePopup()
    },
    onReset () {
      this.currentValue = this.value
      this.hidePopup()
    },
    toggleSelectAll (selected) {
      this.currentValue = selected
        ? this.listOptions.map(({ value }) => value)
        : []
    }
  }
}
</script>
