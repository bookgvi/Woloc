<template lang="pug">
  .q-pa-none
    q-card
      name-slot(:name="`Залы ` + studioName").q-pb-none
      q-card-section.q-pa-none
        q-markup-table.q-pb-md(
          style="min-width: 370px"
          wrap-cells
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
import NameSlot from '../../CommonModules/NameSlot'
export default {
  name: 'RoomsCard',
  components: { NameSlot },
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
