<template lang="pug">
  .promo.q-pa-md
    .row.q-pb-sm
      .col
        .text-h5 Промокод № {{ row.id }}
      .col-auto
        q-icon.cursor-pointer(name="close" v-close-popup style="font-size: 1.5rem;")
    .row.q-pb-sm
      .col
        span(style="color: red;") *&nbsp;
        span Название промокода
    .row.q-pb-md
      .col
        q-input(
          v-model="alias"
          outlined
          dense
          lazy-rules
          :rules="[ val => val && val.length > 0 || '* Поле обязательно для заполнения']"
        )
    .row.q-pb-sm
      .col.q-pr-sm
        span Локация
      .col
        span(style="color: red;") *&nbsp;
        span Зал
    .row.q-pb-md
      .col.q-pr-sm
        q-select.elipsis(
          v-model="selectedStudio"
          :options="locationsAll.map(item => item.name)"
          outlined
          dense
        )
      .col
        q-select.elipsis(
          v-model="selectedRoom"
          :options="allRooms.map(item => item.name)"
          multiple
          outlined
          dense
          lazy-rules
          :rules="[ val => !!val || '* Поле обязательно для заполнения']"
        )

    .row.q-pb-sm
      .col.q-pr-sm
        span(style="color: red;") *&nbsp;
        span Скидка
      .col
        span(style="color: red;") *&nbsp;
        span Тип
    .row.q-pb-md
      .col.q-pr-sm
        q-input(
          v-model="discount"
          outlined
          dense
          lazy-rules
          :rules="[ val => val && val.length > 0 || '* Поле обязательно для заполнения']"
        )
      .col
         q-select(
           v-model="discountType"
           :options="allDiscountTypes"
           outlined
           dense
           lazy-rules
           :rules="[ val => val && val.length > 0 || '* Поле обязательно для заполнения']"
         )
    .row.q-pb-sm
      .col.q-pr-sm
        span(style="color: red;") *&nbsp;
        span Минимальная сумма заказа, ₽.
      .col
        span Статус
    .row.q-pb-md
      .col.q-pr-sm
        q-input(
          v-model="minPrice"
          outlined
          dense
          lazy-rules
          :rules="[ val => val && val.length > 0 || '* Поле обязательно для заполнения']"
        )
      .col
        q-select(
          v-model="currentStatus"
          :options="statusArr"
          outlined
          dense
        )
    .row
      .col.q-pr-sm
        span(style="color: red;") *&nbsp;
        span Период действия
      .col
        span(style="color: red;") *&nbsp;
        span Период действия
    .row.q-pb-xl
      .col-6.q-pr-sm
        VueCtkDateTimePicker.q-pt-sm(
          id="datePicker1"
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
          id="datePicker2"
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
        q-btn.q-py-sm(label="Удалить" @click="$emit('promoDelete', row.id)" no-caps flat style="width: 100%; border: 1px solid silver;")
      .col
        q-btn.q-py-sm.bg-primary.text-white(label="Сохранить" @click="savePromo" no-caps flat style="width: 100%")
</template>

<script>
import { date } from 'quasar'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

export default {
  props: {
    row: {
      type: Object,
      default: () => ({}),
    },
    allStudiosProps: Array,
    singleStudio: Object
  },
  components: {
    VueCtkDateTimePicker,
    date
  },
  data () {
    return {
      alias: '', // Promocode name
      locationSelected: '',
      locationsAll: [],
      roomSelected: [],
      roomsAll: [],
      discount: '',
      type: '', // Тип скидки
      typeAll: { 'rub': 'В рублях', 'percent': 'В процентах' },
      minPrice: '',
      isPublic: 0,
      statusArr: ['Публичный', 'Персональный'],
      lang: 'ru',
      dateLabel1: '',
      dateRange1: '',
      dateLabel2: '',
      dateRange2: ''
    }
  },
  computed: {
    selectedStudio: {
      get () {
        return this.locationSelected
      },
      set (val) {
        this.locationSelected = val
        const selectedStudio = this.locationsAll.filter(item => item.name === val).pop()
        this.allRooms = selectedStudio.rooms
        if (val !== this.singleStudio.name) this.selectedRoom = ''
        else this.selectedRoom = this.row.rooms.map(item => item.name)
      }
    },
    allRooms: {
      get () {
        return this.roomsAll
      }
    },
    selectedRoom: {
      get () {
        return this.roomSelected
      },
      set (val) {
        this.roomSelected = val
      }
    },
    allDiscountTypes: {
      get () {
        return Object.keys(this.typeAll).map(item => this.typeAll[item])
      }
    },
    discountType: {
      get () {
        return this.typeAll[this.type]
      },
      set (val) {
        this.type = Object.keys(this.typeAll).filter(item => this.typeAll[item] === val)[0]
      }
    },
    currentStatus: {
      get () {
        return this.statusArr[this.isPublic]
      },
      set (val) {
        this.isPublic = this.statusArr.indexOf(val)
      }
    }
  },
  mounted () {
    this.setStartedValues()
  },
  methods: {
    async setStartedValues () {
      this.alias = this.row.alias
      this.locationsAll = this.allStudiosProps
      this.locationSelected = this.singleStudio.name
      const selectedStudio = this.locationsAll.filter(item => item.name === this.locationSelected).pop()
      this.roomsAll = selectedStudio.rooms
      if (this.row.rooms) {
        this.roomSelected = this.row.rooms.map(item => item.name)
      }
      this.discount = this.row.discount
      this.type = this.row.type
      this.minPrice = this.row.minPrice
      this.isPublic = this.row.isPublic
      this.dateRange1 = {
        'start': date.formatDate(this.row.startedAt, 'YYYY-MM-DD'),
        'end': date.formatDate(this.row.expiredAt, 'YYYY-MM-DD')
      }
      this.dateRange2 = {
        'start': date.formatDate(this.row.dateFrom, 'YYYY-MM-DD'),
        'end': date.formatDate(this.row.dateTo, 'YYYY-MM-DD')
      }
    },
    async savePromo () {
      this.$emit('createUpdate', this.row.id, {
        alias: this.alias,
        rooms: this.roomSelected,
        discount: this.discount,
        minPrice: this.minPrice,
        isPublic: this.isPublic,
        type: this.type,
        startedAt: this.dateRange1['start'] ? this.dateRange1['start'].split(' ')[0] : this.dateRange1['start'],
        expiredAt: this.dateRange1['end'] ? this.dateRange1['end'].split(' ')[0] : this.dateRange1['end'],
        dateFrom: this.dateRange2['start'] ? this.dateRange2['start'].split(' ')[0] : this.dateRange2['start'],
        dateTo: this.dateRange2['end'] ? this.dateRange2['end'].split(' ')[0] : this.dateRange2['end']
      })
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
