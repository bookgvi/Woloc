<template lang="pug">
  .roomData
    .row.q-pb-lg
      .col
        .text-h6 Данные зала
    .row.q-pb-sm
      span Локация
    .row.q-pb-lg
      .col
        q-select(v-model="singleStudio.name" :options="allStudiosName" outlined dense)

</template>

<script>
export default {
  name: 'roomData',
  props: {
    singleStudio: Object,
    allStudiosName: Array
  }
}
</script>
