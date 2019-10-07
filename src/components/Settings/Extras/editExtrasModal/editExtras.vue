<template lang="pug">
  .editExtras
    .row.justify-center
      .col
        .text-h6 Дополнительная услуга
      q-space
      .col-1
        q-btn(icon="close" flat @click="$emit('hide')")
</template>

<script>
export default {
  name: 'editExtras'
}
</script>

<style scoped>

</style>
