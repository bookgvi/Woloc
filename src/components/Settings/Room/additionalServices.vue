<template lang="pug">
  .additional
    .row.q-pb-lg
      .col
        .text-h5.text-bold Доп. услуги
    .row(v-if="isExtras")
      // Модификация объекта!!!!!!!
      .col-6(v-for="(item, index) in extras" :key="index")
        q-checkbox(v-if="index < itemsCount" v-model="item.isChecked" :label="item.name")
    .row.q-pb-lg(v-if="isExtras")
      .col.cursor-pointer(@click="isExtras=!isExtras")
        .text-h6.text-primary Показать все
    .row(v-if="!isExtras")
      // Модификация объекта!!!!!!!
      .col-6(v-for="(item, index) in extras" :key="index")
        q-checkbox(v-model="item.isChecked" :label="item.name")
    .row.q-pb-lg(v-if="!isExtras")
      .col.cursor-pointer(@click="isExtras=!isExtras")
        .text-h6.text-primary Скрыть
</template>

<script>
export default {
  name: 'specifications',
  props: {
    extras: {
      type: Array,
      default: _ => []
    }
  },
  data: () => ({
    itemsCount: 6,
    isExtras: true
  })
}
</script>
