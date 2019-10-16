<template lang="pug">
  .jswidget
    .row.q-pb-md.justify-center
      .col-6
        .row.q-pb-md
          .text-h5 JS Widget
        .row.q-pb-xs
          .col.q-pr-sm
            span Локация
          .col.q-pr-sm
            span Залы
        .row.q-pb-md
          .col.q-pr-sm
            q-select(v-model="currentStudio" :options="data.studios" outlined dense)
          .col
            q-select(v-model="currentRoom" :options="data.rooms" outlined dense)
        .row.q-pb-xs
          .col.q-pr-sm
            span Фон
          .col.q-pr-sm
            span Источник бронирования
        .row.q-pb-md
          .col.q-pr-sm
            q-select(v-model="currentBackground" :options="data.background" outlined dense)
          .col
            q-select(v-model="currentSource" :options="data.bookingSource" outlined dense)
        .row.q-pb-xs
          .col.q-pr-sm
            span Ширина
        .row.q-pb-md
          .col.q-pr-sm
            q-input(v-model="data.width" outlined dense)
          .col.q-pr-sm
            q-select(v-model="currentUnit" :options="data.widthUnit" outlined dense)
          .col
            q-btn.bg-primary.text-white(
              label="Сгенерировать код"
              :disable="currentSource === ''"
              @click="generate"
              style="width: 100%;"
              no-caps
            )
</template>

<script>
export default {
  name: 'index',
  data: () => ({
    currentStudio: '',
    currentRoom: '',
    currentBackground: '',
    currentSource: '',
    currentUnit: '',
    data: {}
  }),
  async created () {
    this.data = await this.$app.jswidget.getAll()
    this.currentStudio = this.data.studios[0]
    this.currentRoom = this.data.rooms[0]
    this.currentBackground = this.data.background[0]
    this.currentUnit = this.data.widthUnit[0]
  },
  methods: {
    generate () {
      this.currentSource = ''
    }
  }
}
</script>

<style scoped>

</style>
