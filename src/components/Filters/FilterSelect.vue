<template lang="pug">
  q-btn.q-py-none.q-px-sm(
    outline
    no-caps
    dense
    :label="title"
    :disabled="disabled"
  )
    q-popup-proxy(ref="QPopupProxy")
      q-option-group.text-body2.q-pa-md(
        color="black"
        :type="type"
        :options="listOptions"
        v-model="currentValue"
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
  }
}
</script>
