<template lang="pug">
  .q-pa-none
    q-card
      q-card-section
        span.row.text-bold.text-body1.q-pt-md.q-pl-sm {{ "Загруженность"}}
      nav-bar.q-pb-md(
        @dateChange="selectedDate = $event"
        @studioChange="studio = $event"
      )
      q-card-section.q-pb-none
        q-markup-table.q-pb-md(
          separator="none"
          dense
          flat
        )
          thead.text-left
            tr
              th(style="width: 70%")
                span.text-bold.text-black.text-body2 Зал
              th
                span.text-bold.text-black.text-body2 %
              th
                span.text-bold.text-black.text-body2 часы
          tbody
            tr(
              v-for="(load, index) in options"
              :key="index"
            )
              td
                q-icon.q-mr-md(
                  :style="{color: load.color}"
                  name="far fa-circle"
                )
                span {{ load.name }}
              td
                span.text-grey.text-caption {{ load.percents }}
              td
                span.text-body1 {{ load.hours }}
</template>

<script>

import NavBar from '../CommonModules/NavBar'

export default {
  name: 'WorkloadCard',
  components: { NavBar },
  data () {
    return {
      selectedDate: this.$moment({ hour: 0 }).parseZone(),
      studio: (this.$app.studios.list.length > 0) ? this.$app.studios.list[0].id : 0,
    }
  },
  computed: {
    rooms () {
      return this.$app.rooms.getAvailable({ studio: this.studio })
    },
    options () {
      if (!this.rooms) return []
      return this.rooms.map(item => {
        return {
          name: item.name,
          color: '#' + ((1 << 24) * Math.random() | 0).toString(16),
          hours: item.name.length,
          percents: item.name.length * 5
        }
      })
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
