<template lang="pug">
  .jswidget.q-pt-lg
    .row.q-pb-md.justify-center
      .col-6
        .row.q-pb-md
          .text-h5 JS Widget
        .row.q-pb-xs
          .col.q-pr-sm
            span Локация
          .col
            span Залы
        .row.q-pb-md
          .col.q-pr-sm
            q-select(v-model="currentStudioVM" :options="data.studios" outlined dense)
          .col
            q-option-group(
              :options="roomSelectorArray"
              label="Notifications"
              type="radio"
              v-model="roomSelector"
            )
        .row.q-pb-xs
          .col.q-pr-sm
            span Выбранный зал
          //.col
            span Источник бронирования
        .row.q-pb-md
          .col.q-pr-sm
            q-select(v-if="roomSelector === 'allRooms'" v-model="currentRoomVM" :options="roomsNames" outlined dense)
            q-input(v-if="roomSelector === 'singleRoom'" :value="currentRoomVM" outlined dense)
          //.col.q-pr-sm
            q-select(v-model="currentSource" :options="data.bookingSource" @input="changeSource" outlined dense)
          .col
            q-btn.bg-primary.text-white(
              label="Сгенерировать код"
              @click="generate"
              style="width: 100%;"
              no-caps
            )
        .row.q-pb-xs.justify-around
          .col.q-pr-sm
            span Код для вставки
          .col.q-pr-sm
            .text-primary.cursor-pointer(@click="copyWidget" style="text-align: right;") Скопировать
        .row.q-pb-md
          .col
            textarea.jswidgetArea.q-pa-sm.text-grey-8(v-if="isWidget" rows=3 style="width: 100%;")
            textarea.jswidgetArea.q-pa-sm.text-grey-8(v-if="!isWidget" v-model="newWidgetCode" rows=30 style="width: 100%;")

</template>

<script>
import jswidget from '../../../api/jswidget'

export default {
  name: 'index',
  data () {
    return {
      allStudiosAndRooms: [],
      currentStudio: '',
      currentRoom: '',
      roomsNames: [],
      roomSelector: 'singleRoom',
      currentRoomId: '',
      roomSelectorArray: [{
        label: 'Один зал',
        value: 'singleRoom'
      },
      {
        label: 'Все залы',
        value: 'allRooms'
      }],
      isWidget: true,
      newWidgetCode: '',
      data: {}
    }
  },
  computed: {
    currentStudioVM: {
      get () {
        return this.currentStudio
      },
      set (val) {
        this.currentStudio = val
        this.roomsNames = []
        this.currentRoom = ''
        const roomsArray = this.allStudiosAndRooms.filter(item => item.name === val)[0].rooms
        if (!roomsArray || !roomsArray.length) return
        this.roomsNames = roomsArray.map(item => item.name)
        this.currentRoom = this.roomsNames[0]
      }
    },
    currentRoomVM: {
      get () {
        return this.currentRoom
      },
      set (val) {
        this.currentRoom = val
        const roomsArray = this.allStudiosAndRooms.map(item => item.rooms.filter(item2 => item2.name === val)[0])[0]
        this.currentRoomId = roomsArray.id
      }
    }
  },
  async created () {
    this.getStudiosAndRooms()
  },
  methods: {
    async getStudiosAndRooms () {
      const { items } = await this.$app.studios.getAll()
      this.allStudiosAndRooms = items
      this.data.studios = items.map(item => item.name)
      this.currentStudio = items[0].name
      this.currentRoom = items[0].rooms[0].name
      this.currentRoomId = items[0].rooms[0].id
      this.roomsNames = items[0].rooms.map(item => item.name)
    },
    async generate () {
      this.isWidget = false
      this.newWidgetCode = await jswidget.getOne(this.currentRoomId)
    },
    copyWidget () {
      const widgetNode = document.querySelector('.jswidgetArea')
      widgetNode.focus()
      widgetNode.select()
      try {
        document.execCommand('copy')
      } catch (err) {
        console.error(`Can't copy`)
      }
    },
    changeSource () {
      this.isWidget = true
    }
  }
}
</script>

<style scoped>

</style>
