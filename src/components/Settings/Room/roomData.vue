<template lang="pug">
  .roomData
    .row.q-pb-lg
      .col
        .text-h6 Данные зала
    .row.q-pb-lg
      .col
        span Локация
        q-input.q-pt-sm(v-model="currentStudio.name" outlined dense disable)
    .row.q-pb-lg
      .col
        span Название зала
        q-input.q-pt-sm(v-model="selectedRoomName" outlined dense)
    .row.q-pb-md
      span Цвет зала в календаре
    .row.items-center.q-pb-md
      .inline-block.q-mr-sm(style="width: 30px; height: 30px; cursor: pointer; background: cyan;" @click="roomColor='cyan'")
      .inline-block.q-mr-sm(style="width: 30px; height: 30px; cursor: pointer; background: yellow;" @click="roomColor='yellow'")
      .inline-block.q-mr-sm(style="width: 30px; height: 30px; cursor: pointer; background: red;" @click="roomColor='red'")
      .inline-block.q-mr-sm(style="width: 30px; height: 30px; cursor: pointer; background: green;" @click="roomColor='green'")
      .inline-block.q-mr-xl(style="width: 30px; height: 30px; cursor: pointer; background: blue;" @click="roomColor='blue'")
      .row.q-pa-sm(style="border: 1px solid silver")
        .inline-block.q-mr-md(:style="{ width: '30px', height: '30px', background: color}")
        q-icon.cursor-pointer(name="colorize" style="font-size: 2rem;")
         q-popup-proxy(:offset="[10, 10]")
          .block
            q-color(
              v-model="roomColor"
              no-footer
              style="width: 300px;"
            )
    .row.q-pb-md
      .col-4.q-pr-sm
        span Статус
        q-select(v-model="roomStatus" :options="statuses" outlined dense)
      .col-4.q-pr-sm
        span Тип зала
        q-select(v-model="currentRoomType" :options="roomType" outlined dense)
      .col-4.q-pr-sm
        span Мин. кол-во часов
        q-input(v-model="minHours" outlined dense)
    .row.q-pb-md
      span Опубликован и доступен для бронирования
    .row.q-pb-sm
      span Предоплата
    .row.q-pb-lg
      .col-7.q-pr-sm
        q-select(v-model="currentPrepay" :options="prepay" outlined dense)
      .col.q-pa-none
        q-btn.bg-primary.text-white(label="Привязать google календарь" no-caps)
</template>

<script>
export default {
  name: 'roomData',
  props: {
    currentStudio: {
      type: Object,
      default: _ => { return { name: '' } }
    },
    selectedRoom: {
      type: String,
      default: _ => 'Новый зал'
    },
    color: {
      validator: value => {
        return ['string', 'null'].indexOf(typeof value) !== -1
      },
      default: () => '#FF0000'
    },
    status: {
      type: Number,
      default: _ => 2
    },
    isRoom: {
      type: Number,
      default: _ => 1
    },
    minHours: {
      type: Number,
      default: _ => 1
    },
    needPrepayment: {
      type: Number,
      default: _ => 0
    }
  },
  data: () => ({
    // currentStudioName: '',
    selectedRoomName: '',
    roomColor: null,
    roomStatus: 'Открыт',
    statuses: ['Скрыт', 'Открыт', 'Закрыт'],
    currentRoomType: 'Рабочий',
    roomType: ['Гримерка или подсобка', 'Рабочий'],
    currentPrepay: 'На выбор клиента',
    prepay: ['Без предоплаты', 'На выбор клиента']
  }),
  mounted () {
    this.selectedRoomName = this.selectedRoom
    this.roomColor = this.color
    // TODO уточнить всегда ли свойства приходят в одном порядке
    this.roomStatus = this.statuses[this.status]
    this.currentRoomType = this.roomType[this.isRoom]
    this.currentPrepay = this.prepay[this.needPrepayment]
  }
}
</script>
