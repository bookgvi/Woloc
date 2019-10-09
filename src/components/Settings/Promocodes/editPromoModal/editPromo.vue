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
      .row
        .col.q-pr-sm
          DateRange(
            class="calendar"
            :sync-range.sync="range"
            :lang="lang"
            v-model="range"
          )
        .col.q-pr-sm
          DateRange(
            class="calendar"
            :sync-range.sync="range2"
            :lang="lang"
            v-model="range2"
          )
      .row.q-pb-md
        .col-4
          span Заполните только дату начала, если срок действия должен быть неограничен.
      .row.justify-center
        .col-4.q-mr-sm
          q-btn(label="Удалить" outlined dense no-caps)
        .col-4
          q-btn.bg-primary.text-white(label="Сохранить" outlined dense no-caps)
</template>

<script>
import RowDialog from '../../../DataTable/RowDialog'
import { DateRange } from 'vue-date-range'
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
        startDate: this.$moment(),
        endDate: this.$moment().add(7, 'days')
      },
      range2: {
        startDate: this.$moment(),
        endDate: this.$moment().add(7, 'days')
      }
    }
  }
}
</script>

<style scoped>

</style>
