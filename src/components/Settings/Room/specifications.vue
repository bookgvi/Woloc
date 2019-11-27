<template lang="pug">
  .specifications
    .row.q-pb-lg
      .col
        .text-h6 Характеристики
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
    .row.q-pb-lg
      .col.q-pr-sm
        // Модификация объекта!!!!!!!
        .row(v-for="(item, index) in characteristics" :key="index")
          .col
            q-checkbox(v-model="item.isChecked" :label="item.name")
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
    roomHeight: 0,
    roomYardage: 0,
    roomDescription: '',
    var1: true,
    var2: false
  }),
  created () {
    this.roomHeight = this.height
    this.roomYardage = this.yardage
    this.roomDescription = this.description
  }
}
</script>
