<template lang="pug">
  q-date(
    v-model="date"
    minimal
    mask="YYYY-MM-DD"
  )
</template>

<script>
export default {
  name: 'CalendarDate',
  data () {
    return {
      date: ''
    }
  }
}
</script>

<style scoped>

</style>
