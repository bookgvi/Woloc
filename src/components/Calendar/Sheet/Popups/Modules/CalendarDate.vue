<template lang="pug">
  q-date.fit(
    v-model="date"
    minimal
    mask="YYYY-MM-DD"
  ) {{ dateComp }}
</template>

<script>
export default {
  name: 'CalendarDate',
  data () {
    return {
      date: ''
    }
  },
  computed: {
    dateComp () {
      return this.dateChange()
    }
  },
  methods: {
    dateChange () {
      this.$emit('dateChange', this.date)
    }
  }
}
</script>

<style scoped>

</style>
