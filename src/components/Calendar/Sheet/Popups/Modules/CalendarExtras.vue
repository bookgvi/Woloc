<template lang="pug">
  .col-12.flex.justify-left.items-center
    q-option-group.text-body2(
      v-model="checkedExtras"
      :options="$app.extras.forSelect"
      color="green"
      type="checkbox"
    ) {{ extrasComp }}
</template>

<script>
export default {
  name: 'CalendarExtras',
  data () {
    return {
      checkedExtras: []
    }
  },
  computed: {
    extrasComp () {
      return this.extrasChange()
    }
  },
  methods: {
    extrasChange () {
      this.$emit('extrasChange', this.checkedExtras)
    }
  }
}
</script>

<style scoped>

</style>
