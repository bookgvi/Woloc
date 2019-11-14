<template lang="pug">
  .notifications
    .row.justify-center
      h1 E-mail уведомления
      span.text-bold Получать информацию:
      q-option-group(
        type="checkbox"
        :options="options"
        v-model="checkedOptions"
      )
</template>

<script>
export default {
  name: 'notifications',
  data () {
    return {
      checkedOptions: [],
      options: []
    }
  }
}
</script>

<style scoped>

</style>
