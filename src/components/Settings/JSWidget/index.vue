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
            q-select(v-model="currentStudioVM" :options="studiosNames" outlined dense)
          .col
            q-select(v-model="currentRoomVM" :options="roomsNames" outlined dense)
        .row.q-pb-md
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
            textarea.jswidgetArea.q-pa-sm.text-grey-8(v-model="newWidgetCode" :rows="rowsForWidget" style="width: 100%;")

</template>

<script>

export default {
  name: 'index',
  data () {
    return {
      allStudiosAndRooms: [],
      currentStudio: '',
      currentRoom: '',
      roomsNames: [],
      studiosNames: [],
      currentRoomId: 1,
      newWidgetCode: '',
      rowsForWidget: 3
    }
  },
  computed: {
    currentStudioVM: {
      get () {
        return this.currentStudio
      },
      set (val) {
        this.currentStudio = val
        this.currentRoomVM = ''
        this.currentRoomId = ''
        this.roomsNames = []
        if (!this.allStudiosAndRooms) return
        const [{ rooms }] = this.allStudiosAndRooms.filter(item => item.name === val)
        if (!rooms.length) return
        this.currentRoomVM = rooms[0].name
        this.currentRoomId = rooms[0].id
        this.roomsNames = rooms.map(item => item.name)
      }
    },
    currentRoomVM: {
      get () {
        return this.currentRoom
      },
      set (val) {
        this.currentRoom = val
        this.allStudiosAndRooms.map(item => item.rooms.forEach(item2 => {
          if (item2.name === val) this.currentRoomId = item2.id
        }))
      }
    }
  },
  async created () {
    const { items } = await this.$app.studios.getAll()
    this.allStudiosAndRooms = items
    this.currentStudio = items[0].name
    this.studiosNames = items.map(item => item.name)
    this.currentRoom = items[0].rooms[0].name
    this.currentRoomId = items[0].rooms[0].id
    this.roomsNames = items[0].rooms.map(item => item.name)
  },
  methods: {
    async generate () {
      const result = await this.$app.jswidget.getOne(this.currentRoomId)
      if (result !== 'error') {
        this.newWidgetCode = result
        this.rowsForWidget = 30
      } else {
        this.newWidgetCode = ''
        this.rowsForWidget = 3
        this.showNotif('При генерации виджета возникла ошбика')
      }
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
    showNotif (msg, clr = 'purple') {
      this.$q.notify({
        message: msg,
        color: clr
      })
    }
  }
}
</script>

<style scoped>

</style>
