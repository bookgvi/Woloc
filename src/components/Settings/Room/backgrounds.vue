<template lang="pug">
  .backgrounds
    .row.q-pb-lg
      .col
        .text-h6 Фоны
    .row(v-if="isBackground")
      // Модификация объекта!!!!!!!
      .col-6(v-for="(item, index) in backgrounds" :key="index")
        q-checkbox(v-if="index < itemsCount" v-model="item.isChecked" :label="item.name")
    .row.q-pb-lg(v-if="isBackground")
      .col.cursor-pointer(@click="isBackground=!isBackground")
        .text-h6.text-primary Показать все
    .row(v-if="!isBackground")
      // Модификация объекта!!!!!!!
      .col-6(v-for="(item, index) in backgrounds" :key="index")
        q-checkbox(v-model="item.isChecked" :label="item.name")
    .row.q-pb-lg(v-if="!isBackground")
      .col.cursor-pointer(@click="isBackground=!isBackground")
        .text-h6.text-primary Скрыть
</template>

<script>
export default {
  name: 'specifications',
  props: {
    backgrounds: {
      type: Array,
      default: _ => []
    }
  },
  data: () => ({
    itemsCount: 6,
    isBackground: true
  })
}
</script>
