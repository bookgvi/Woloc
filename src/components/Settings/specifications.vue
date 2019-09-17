<template lang="pug">
  .specifications
    h6.q-mb-md Характеристики
    .row.q-pb-lg
      .col
        span Описание локации
        q-input.q-pt-sm(v-model="description" type="textarea" outlined)
    .row.q-pb-sm
      .col.q-pr-sm
        span Лимит, недели
        q-input(v-model="limit" outlined dense)
      .col.q-pr-sm
        span Высота потолков, м
        q-input(v-model="height" outlined dense)
      .col
        span(style="line-height: 0;") Площадь, м
          sup 2
        q-input(v-model="square" outlined dense)
    .row.q-pb-lg
      p Насколько недель вперед возможна бронь.
</template>

<script>
export default {
  name: 'specifications',
  data: () => ({
    description: '',
    limit: 4,
    height: 7,
    square: 700
  })
}
</script>

<style scoped>

</style>
