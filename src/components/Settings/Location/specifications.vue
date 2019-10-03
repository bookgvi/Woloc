<template lang="pug">
  .specifications
    h6.q-mb-md Характеристики
    .row.q-pb-lg
      .col
        span Описание локации &nbsp
        span.text-red *
        q-input.q-pt-sm(v-model="singleStudio.description" type="textarea" rows=15 outlined)
    .row.q-pb-sm.items-end
      .col.q-pr-sm
        span Лимит, недели &nbsp
        span.text-red *
        q-input(v-model="singleStudio.limit" outlined dense)
      .col.q-pr-sm
        span Высота потолков, м &nbsp
        span.text-red *
        q-input(v-model="singleStudio.height" outlined dense)
      .col
        span(style="line-height: 0;") Площадь,
        span.text-red * &nbsp
        span м
          sup 2
        q-input(v-model="singleStudio.yardage" outlined dense)
    .row.q-pb-lg
      p Насколько недель вперед возможна бронь.
</template>

<script>
export default {
  name: 'specifications',
  props: {
    singleStudio: Object
  }
}
</script>

<style scoped>

</style>
