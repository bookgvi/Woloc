<template lang="pug">
  q-card-section.row
    q-btn.q-mr-md(
      label="Студия"
      size="xs"
      no-caps
      outline
      color="secondary"
    )
    q-btn.q-mr-xs(
      label="Неделя"
      size="xs"
      no-caps
      outline
      @click="setPeriod"
      color="secondary"
    )
    q-btn.q-mr-xs(
      outline
      label="Месяц"
      size="xs"
      no-caps
      @click="setPeriod"
      color="secondary"
    )
    q-btn.q-mr-xs(
      outline
      size="xs"
      label="Квартал"
      no-caps
      @click="setPeriod"
      color="secondary"
    )
    q-space
    q-btn-group(outline)
      q-btn.q-px-sm.q-mx-none(
        size="xs"
        outline
        icon="chevron_left"
        color="secondary"
      )
      q-separator(vertical, inset)
      q-btn.q-px-sm.q-mx-none(
        size="xs"
        outline
        icon="chevron_right"
        color="secondary"
      ) {{ periodComp }}
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      period: this.startPeriod || ''
    }
  },
  computed: {
    periodComp () {
      return this.periodChange()
    },
  },
  methods: {
    setPeriod (e) {
      console.log(e.srcElement.innerText)
      switch (e.srcElement.innerText) {
        case 'Неделя':
          this.period = 'week'
          break
        case 'Месяц':
          this.period = 'month'
          break
        case 'Квартал':
          this.period = 'quarter'
          break
      }
    },
    periodChange () {
      this.$emit('periodChange', this.period)
    }
  },
  props: ['startPeriod'],
  watch: {
    'period' (v) {
      this.period = v
    }
  }
}
</script>

<style scoped>

</style>
