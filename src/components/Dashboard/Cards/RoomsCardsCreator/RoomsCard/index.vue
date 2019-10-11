<template lang="pug">
  .q-pa-none
    q-card
      q-card-section.q-pb-none
        span.row.text-bold.text-body1.q-pt-md.q-pl-sm Залы {{ studioName }}
      q-card-section.q-py-none
        q-markup-table.q-pb-md(
          separator="none"
          dense
          flat
        )
          thead.text-left
            tr
              th(style="width: 100%")
          tbody
            tr(
              v-for="(item, index) in options"
              :key="index"
            )
              td
                q-icon.q-mr-md(
                  :style="{color: item.color}"
                  name="far fa-circle"
                )
                span {{ item.name }}
      q-card-actions.q-pt-none.q-pl-lg
        q-btn.q-mr-xs.text-body2.text-black(
          outline
          size="sm"
          label="Добавить зал"
          no-caps
          @click="addRoom"
          color="secondary"
        )
</template>

<script>
export default {
  name: 'RoomsCard',
  data () {
    return {
      selectedDate: this.$moment({ hour: 0 }).parseZone(),
    }
  },
  computed: {
    rooms () {
      return this.$app.rooms.getAvailable({ studio: this.studio })
    },
    studioName () {
      const studio = this.$app.studios.list.find(item => item.id === this.studio)
      return (studio) ? studio.name : ''
    },
    options () {
      return this.rooms.map(item => {
        return {
          name: item.name,
          color: '#' + ((1 << 24) * Math.random() | 0).toString(16)
        }
      })
    }
  },
  methods: {
    addRoom () {
      //
    }
  },
  props: {
    studio: Number
  }
}
</script>

<style scoped>

</style>
