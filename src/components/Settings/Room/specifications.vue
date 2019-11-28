<template lang="pug">
  .specifications
    .row.q-pb-lg
      .col
        .text-h5.text-bold Характеристики
    .row.q-pb-lg
      .col
        span Описание зала
          textarea.q-pa-sm.text-grey-8(
            v-model="specification.description"
            type="textarea"
            rows=5
            style="width: 100%;"
          )
    .row.q-pb-lg
      .col.q-pr-sm
        span Высота потолков, м
        q-input(v-model="specification.height" outlined dense)
      .col
        span(style="line-height: 0;") Площадь, м
          sup 2
        q-input(v-model="specification.yardage" outlined dense)
    abstract-list(:dataArray="specification.characteristics")

</template>

<script>
import AbstractList from './AbstractDataList/abstractList'
export default {
  name: 'specifications',
  components: { AbstractList },
  props: {
    specification: {
      type: Object
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
