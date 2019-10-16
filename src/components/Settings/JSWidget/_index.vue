<template>
  <div class="jswidget">
    <div class="row q-pb-md justify-center">
      <div class="col-6">
        <div class="row q-pb-md">
          <h5>JS Widget</h5>
        </div>
        <div class="row q-pb-xs">
          <div class="col q-pr-sm">
            Локация
          </div>
          <div class="col">
            Залы
          </div>
        </div>
        <div class="row q-pb-md">
          <div class="col q-pr-sm">
            <q-select v-model="currentStudio" :options="data.studios" outlined dense />
          </div>
          <div class="col">
            <q-select v-model="currentRoom" :options="roomsNames" outlined dense />
          </div>
        </div>
        <div class="row q-pb-xs">
          <div class="col q-pr-sm">
            Фон
          </div>
          <div class="col">
            Источник бронирования
          </div>
        </div>
        <div class="row q-pb-md">
          <div class="col q-pr-sm">
            <q-select v-model="currentBackground" :options="data.background" outlined dense />
          </div>
          <div class="col">
            <q-select v-model="currentSource" :options="data.bookingSource" outlined dense />
          </div>
        </div>
        <div class="row q-pb-xs">
          <div class="col q-pr-sm">
            Ширина
          </div>
        </div>
        <div class="row q-pb-md">
          <div class="col q-pr-sm">
            <q-input v-model="data.width" outlined dense />
          </div>
          <div class="col q-pr-sm">
            <q-select v-model="currentUnit" :options="data.widthUnit" outlined dense />
          </div>
          <div class="col">
            <q-btn class="bg-primary text-white"
              label="Сгенерировать код"
              :disable="currentSource === ''"
              @click="generate"
              style="width: 100%;"
              no-caps
            />
          </div>
        </div>
        <div class="row q-pb-xs justify-around">
          <div class="col q-pr-sm">
            Код для вставки
          </div>
          <div class="col q-pr-sm">
            <div
              @click="copyWidget"
              class="text-primary cursor-pointer"
              style="text-align: right;">
              Скопировать
            </div>
          </div>
        </div>
        <div class="row q-pb-md">
          <div class="col">
            <q-input class="jswidgetArea" v-if="isWidget" type="textarea" rows=3 outlined dense />
            <q-input class="jswidgetArea" v-if="!isWidget" v-model="widgetCode" type="textarea" rows=30 outlined dense />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      currentStudio: '',
      currentRoom: '',
      roomsNames: [],
      currentRoomId: 1,
      currentBackground: '',
      currentSource: '',
      currentUnit: '',
      isWidget: true,
      widgetCode: ``,
      data: {}
    }
  },
  async created () {
    this.data = await this.$app.jswidget.getAll()
    this.currentStudio = this.data.studios[0]
    this.currentRoom = this.data.rooms[0].name
    this.roomsNames = this.data.rooms.map(item => item.name)
    this.currentBackground = this.data.background[0]
    this.currentUnit = this.data.widthUnit[0]
  },
  methods: {
    generate () {
      this.currentSource = ''
      const [{ id }] = this.data.rooms.filter(item => item.name === this.currentRoom)
      this.currentRoomId = id
      console.log(this.currentRoomId)
      this.isWidget = false
    },
    copyWidget () {
      const widgetNode = document.querySelector('.jswidgetArea textarea')
      widgetNode.focus()
      widgetNode.select()
      try {
        document.execCommand('copy')
      } catch (err) {
        console.error(`Can't copy`)
      }
    }
  }
}
</script>

<style scoped>

</style>
