<template lang="pug">
  .organization
    .row.justify-center
      .col-6
        .row.q-py-lg
          .text-h5 Данные организации
        .row.q-pb-xs
          span Название
        .row.q-pb-md
          .col
            q-input(v-model="name" outlined dense)
</template>

<script>
export default {
  name: 'rules',
  data: () => ({
    name: 48
  })
}
</script>

<style scoped>

</style>
