<template lang="pug">
  .specifications
    h6.q-mb-md Характеристики
    .row.q-pb-lg
      .col
        span Описание локации
        q-input.q-pt-sm(:value="datas.description" type="textarea" rows=15 outlined)
    .row.q-pb-sm
      .col.q-pr-sm
        span Лимит, недели
        q-input(:value="datas.limit" outlined dense)
      .col.q-pr-sm
        span Высота потолков, м
        q-input(:value="datas.height" outlined dense)
      .col
        span(style="line-height: 0;") Площадь, м
          sup 2
        q-input(:value="datas.yardage" outlined dense)
    .row.q-pb-lg
      p Насколько недель вперед возможна бронь.
</template>

<script>
export default {
  name: 'specifications',
  props: {
    datas: Object
  }
}
</script>

<style scoped>

</style>
