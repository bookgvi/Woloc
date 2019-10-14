<template lang="pug">
  .promo.q-pa-md
    .row.q-pb-sm
      .col
        .text-h5 Скидка № {{ row.id }}
      .col-1
        q-icon.cursor-pointer(name="close" @click="hasModal" style="font-size: 1.5rem;")
    .row
      .col.q-pr-sm
        span Локация
      .col
        span Зал
    .row.q-pb-md
      .col.q-pr-sm
        q-select(v-model="singleStudio.name" :options="allStudiosName" outlined dense)
      .col
        q-select(v-model="rooms[0].name" :options="rooms.map(item => item.name)" outlined dense)
    .row
      .col.q-pr-sm
        span Процент скидки
      .col
        span Минимальное кол-во часов
    .row.q-pb-md
      .col.q-pr-sm
        q-input(v-model="row.percent" outlined dense)
          template(#append)
            span(style="font-size: 75%") %
      .col
        q-input(v-model="row.minHours" outlined dense)
    .row
      span День недели
    .row.q-pb-sm
      .col.q-pr-sm
        .row
          q-checkbox(label="Понедельник" v-model="week.mon")
        .row
          q-checkbox(label="Вторник" v-model="week.tue")
        .row
          q-checkbox(label="Среда" v-model="week.wed")
        .row
          q-checkbox(label="Четверг" v-model="week.thu")
      .col
        .row
          q-checkbox(label="Пятница" v-model="week.fri")
        .row
          q-checkbox(label="Суббота" v-model="week.sat")
        .row
          q-checkbox(label="Воскресенье" v-model="week.sun")
    .row
      .col.q-pr-sm
        span Период действия
      .col
        span Время действия
    .row.q-pb-md
      .col.q-pr-sm
        q-input.q-pt-sm(:value="currentRange1" outlined dense @click="isCalendar1= !isCalendar1")
        .col(v-if="isCalendar1")
          DateRange(
            :sync-range.sync="range1"
            :lang="lang"
          )
          .row
            .col
              q-btn(label="Сбросить дату" no-caps @click="resetRange(range1)")
            .col
              q-btn.bg-primary.text-white(label="Применить" no-caps @click="applyRange(range1)")
      .col
        .col

    .row.q-pb-md
      .col
        span Заполните только дату начала, если срок действия должен быть неограничен.
    .row.justify-center
      .col.q-mr-sm
        q-btn.q-py-md(label="Удалить" no-caps style="width: 100%")
      .col
        q-btn.q-py-md.bg-primary.text-white(label="Сохранить" no-caps style="width: 100%")
</template>

<script>
import { date } from 'quasar'
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
    DateRange,
    date
  },
  data () {
    return {
      week: {
        mon: true,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false
      },
      isCalendar1: false,
      isCalendar2: false,
      lang: 'ru',
      range1: {
        startDate: this.$moment(),
        endDate: this.$moment()
      },
      range2: {
        startDate: this.$moment(),
        endDate: this.$moment()
      }
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
    hasModal () {
      this.$emit('hasModal')
    },
    applyRange (range) {
      range === this.range1 ? this.isCalendar1 = false : this.isCalendar2 = false
    }
  }
}
</script>
