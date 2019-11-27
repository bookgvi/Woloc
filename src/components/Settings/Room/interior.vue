<template lang="pug">
  .interior
    .row.q-pb-lg
      .col
        .text-h6 Предметы интерьера
    .row(v-if="isInterior")
      // Модификация объекта!!!!!!!
      .col-6(v-for="(item, index) in interiors" :key="index")
        q-checkbox(v-if="index < itemsCount" v-model="item.isChecked" :label="item.name")
    .row.q-pb-lg(v-if="isInterior")
      .col.cursor-pointer(@click="isInterior=!isInterior")
        .text-h6.text-primary Показать все
    .row(v-if="!isInterior")
      // Модификация объекта!!!!!!!
      .col-6(v-for="(item, index) in interiors" :key="index")
        q-checkbox(v-model="item.isChecked" :label="item.name")
    .row.q-pb-lg(v-if="!isInterior")
      .col.cursor-pointer(@click="isInterior=!isInterior")
        .text-h6.text-primary Скрыть
</template>

<script>
export default {
  name: 'specifications',
  props: {
    interiors: {
      type: Array,
      default: _ => []
    }
  },
  data: () => ({
    itemsCount: 6,
    isInterior: true
  })
}
</script>
