<template lang="pug">
  .promo.q-pa-md
    .row.q-pb-sm
      .col
        .text-h5 Промокод № {{ row.id }}
      .col-auto
        q-icon.cursor-pointer(name="close" v-close-popup style="font-size: 1.5rem;")
    .row.q-pb-sm
      .col
        span Название промокода
    .row.q-pb-md
      .col
        q-input(v-model="row.alias" outlined dense)
    .row.q-pb-sm
      .col.q-pr-sm
        span Локация
      .col
        span Зал
    .row.q-pb-md
      .col.q-pr-sm
        q-select.elipsis(v-model="singleStudio.name" :options="allStudiosName" outlined dense)
      .col
        q-select(v-model="row.alias" :options="rooms.map(item => item.name)" outlined dense)
    .row.q-pb-sm
      .col.q-pr-sm
        span Скидка
      .col
        span Тип
    .row.q-pb-md
      .col.q-pr-sm
        q-input(v-model="row.discount" outlined dense)
      .col
        q-select(v-model="type" :options="typeArr" outlined dense)
    .row.q-pb-sm
      .col.q-pr-sm
        span Минимальная сумма заказа, ₽.
      .col
        span Статус
    .row.q-pb-md
      .col.q-pr-sm
        q-input(v-model="row.minPrice" outlined dense)
      .col
        q-select(v-model="row.isPublic" :options="statusArr" outlined dense)
    .row
      .col.q-pr-sm
        span Период действия
      .col
        span Период действия
    .row.q-pb-xl
      .col-6.q-pr-sm
        VueCtkDateTimePicker.q-pt-sm(
          v-model="dateRange1"
          color="#81AEB6"
          formatted="D MMMM Y"
          range
          no-shortcuts
          no-label
          :label="dateLabel1"
          class="datePickerCustomization"
        )
      .col-6.q-pl-xs
        VueCtkDateTimePicker.q-pt-sm(
          v-model="dateRange2"
          color="#81AEB6"
          formatted="D MMMM Y"
          range
          no-shortcuts
          no-label
          :label="dateLabel2"
          class="datePickerCustomization"
        )
    .row.q-py-md
      .col-6.q-pl-sm
        span Заполните только дату начала, если срок действия должен быть неограничен.
    .row.justify-center
      .col.q-mr-sm
        q-btn.q-py-sm(label="Удалить" no-caps flat style="width: 100%; border: 1px solid silver;")
      .col
        q-btn.q-py-sm.bg-primary.text-white(label="Сохранить" no-caps flat style="width: 100%")
</template>

<script>
import { date } from 'quasar'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

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
    VueCtkDateTimePicker,
    date
  },
  data () {
    return {
      isPublic: 'Публичный',
      statusArr: ['Публичный', 'Персональный'],
      type: 'В рублях',
      typeArr: ['В рублях', 'В процентах'],
      lang: 'ru',
      dateLabel1: '',
      dateRange1: '',
      dateLabel2: '',
      dateRange2: ''
    }
  },
  mounted () {
    this.dateRange1 = {
      'start': date.formatDate(this.row.startedAt, 'YYYY-MM-DD'),
      'end': date.formatDate(this.row.expiredAt, 'YYYY-MM-DD')
    }
    this.dateRange2 = {
      'start': date.formatDate(this.row.dateFrom, 'YYYY-MM-DD'),
      'end': date.formatDate(this.row.dateTo, 'YYYY-MM-DD')
    }
  },
  computed: {
    currentRange1: {
      get () {
        return `${this.range1.startDate.format('D MMM')} — ${this.range1.endDate.format('D MMM')}`
      }
    },
    currentRange2: {
      get () {
        return `${this.range2.startDate.format('D MMM')} — ${this.range2.endDate.format('D MMM')}`
      }
    }
  },
  methods: {
    resetRange (range) {
      range.startDate = this.$moment(Date.now())
      range.endDate = this.$moment()
    },
    applyRange (range) {
      range === this.range1 ? this.isCalendar1 = false : this.isCalendar2 = false
    }
  }
}
</script>

<style>
  .q-field__native.row.items-center {
    align-content: center;
  }
  .elipsis span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .datePickerCustomization {
    position: fixed;
    width: 280px;
    z-index: 9999;
  }
  .datePickerCustomization div input {
    width: 100%;
    color: #424242 !important;
    border-radius: 0px !important;
  }
</style>
