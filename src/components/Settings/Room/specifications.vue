<template lang="pug">
  .specifications
    .row.q-pb-lg
      .col
        .text-h5.text-bold Характеристики
    .row.q-pb-lg
      .col
        span Описание зала
          textarea.q-pa-sm.text-grey-8(
            v-model="roomDescription"
            type="textarea"
            rows=5
            style="width: 100%;"
          )
    .row.q-pb-lg
      .col.q-pr-sm
        span Высота потолков, м
        q-input(v-model="roomHeight" outlined dense)
      .col
        span(style="line-height: 0;") Площадь, м
          sup 2
        q-input(v-model="roomYardage" outlined dense)
    .row(v-if="isCharacteristics")
      // Модификация объекта!!!!!!!
      .col-6(v-for="(item, index) in characteristics" :key="index")
        q-checkbox(v-if="index < itemsCount" v-model="item.isChecked" :label="item.name")
    .row.q-pb-lg(v-if="isCharacteristics")
      .col.cursor-pointer(@click="isCharacteristics=!isCharacteristics")
        .text-h6.text-primary Показать все
    .row(v-if="!isCharacteristics")
      // Модификация объекта!!!!!!!
      .col-6(v-for="(item, index) in characteristics" :key="index")
        q-checkbox(v-model="item.isChecked" :label="item.name")
    .row.q-pb-lg(v-if="!isCharacteristics")
      .col.cursor-pointer(@click="isCharacteristics=!isCharacteristics")
        .text-h6.text-primary Скрыть

</template>

<script>
export default {
  name: 'specifications',
  props: {
    description: {
      type: String,
      default: _ => 'Новый зал'
    },
    height: {
      type: Number,
      default: _ => 1
    },
    yardage: {
      type: Number,
      default: _ => 1
    },
    characteristics: {
      type: Array,
      default: _ => []
    }
  },
  data: () => ({
    itemsCount: 6,
    roomHeight: 0,
    roomYardage: 0,
    roomDescription: '',
    isCharacteristics: true
  }),
  created () {
    this.roomHeight = this.height
    this.roomYardage = this.yardage
    this.roomDescription = this.description
  }
}
</script>
