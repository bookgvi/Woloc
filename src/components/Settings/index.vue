<template lang="pug">
  .settings
    q-page-sticky.bg-white(expand position="top" style="z-index: 1000;")
      q-toolbar
        q-toolbar-title
          filters-list(
            name="settings"
            v-slot:default="props"
          )
            studio-filter(v-bind="props")
    .row.justify-center
      .col-6
        div(v-show="false") {{ studioID }}
        datas(:datas="singleStudio")
        specifications(:datas="singleStudio")
        images(:datas="singleStudio")
        addressBlock(:datas="singleStudio")
        services(:datas="singleStudio")
        equipment(:datas="singleStudio")
        rooms(:rooms="rooms")
    .row.q-py-lg.justify-center
      q-btn.bg-primary.text-white.q-px-xl.q-mr-sm(label="Сохранить" no-caps @click="updateStudio")
      q-btn.q-mr-sm(label="Сохранить и создать зал" no-caps disable)
      q-btn.col-2.q-btn--no-uppercase(label="Добавить локацию" dense color="primary" disable)
</template>

<script>
import datas from './datas'
import specifications from './specifications'
import images from './images'
import addressBlock from './address'
import services from './services'
import equipment from './equipment'
import rooms from './rooms'
import studios from '../../api/studios'
import StudioFilter from '../Filters/StudioFilter'
import FiltersList from '../Filters/FiltersList'

export default {
  components: {
    datas,
    specifications,
    images,
    addressBlock,
    services,
    equipment,
    rooms,
    StudioFilter,
    FiltersList
  },
  data () {
    return {
      id: this.$app.filters.getValues('settings').studio,
      singleStudio: {},
      rooms: []
    }
  },
  computed: {
    studioID () {
      this.singleStudioM()
      return this.$app.filters.getValues('settings').studio
    }
  },
  methods: {
    async singleStudioM () {
      const { studio } = this.$app.filters.getValues('settings')
      const { items } = await studios.getAll().then(resp => resp.data)
      const [{ rooms }] = items.filter(item => item.id === studio)
      this.rooms = rooms
      this.singleStudio = await studios.getOne(studio).then(resp => resp.data)
      console.log('qqq', this.singleStudio)
    },
    async updateStudio () {
      const { studio } = this.$app.filters.getValues('settings')
      await studios.updateStudio(studio, this.singleStudio)
    }
  },
  async mounted () {
    this.singleStudioM()
  }
}
</script>
