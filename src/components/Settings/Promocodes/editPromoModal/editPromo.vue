<template lang="pug">
  .promo
    RowDialog(v-bind="$props")
      .row
        .col
          span Название промокода
      .row.q-pb-md
        .col
          q-input(v-model="row.alias" outlined dense)
      .row
        .col.q-pr-sm
          span Локация
        .col
          span Зал
      .row.q-pb-md
        .col.q-pr-sm
          q-select(v-model="singleStudio.name" :options="allStudiosName" outlined dense)
        .col
          q-select(v-model="row.alias" :options="rooms.map(item => item.name)" outlined dense)
      .row
        .col.q-pr-sm
          span Скидка
        .col
          span Тип
      .row.q-pb-md
        .col.q-pr-sm
          q-input(v-model="row.discount" outlined dense)
        .col
          q-select(v-model="type" :options="typeArr" outlined dense)
      .row
        .col.q-pr-sm
          span Минимальная сумма заказа, ₽.
        .col
          span Статус
      .row.q-pb-md
        .col.q-pr-sm
          q-input(v-model="row.minPrice" outlined dense)
        .col
          q-select(v-model="isPublic" :options="statusArr" outlined dense)
      .row
        .col.q-pr-sm
          span Период действия
        .col
          span Период действия
      .row.q-pb-md
        .col.q-pr-sm
          DateRange(
            class="calendar"
            :sync-range.sync="range"
            :lang="lang"
            v-model="range"
          )
        .col
</template>

<script>
import RowDialog from '../../../DataTable/RowDialog'
import { DateRange } from 'vue-date-range'
import moment from '../../../../boot/moment'
export default {
  props: {
    getTitle: Function,
    row: {
      type: Object,
      default: () => ({}),
    },
    allStudiosName: Array,
    rooms: Array,
    singleStudio: Object
  },
  components: {
    RowDialog,
    DateRange
  },
  data () {
    return {
      isPublic: 'Публичный',
      statusArr: ['Публичный', 'Персональный'],
      type: 'В рублях',
      typeArr: ['В рублях', 'В процентах'],
      lang: 'ru',
      range: {
        startDate: moment(),
        endDate: moment().add(7, 'days')
      }
    }
  }
}
</script>

<style scoped>

</style>
