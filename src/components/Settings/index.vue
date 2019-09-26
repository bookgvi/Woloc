<template lang="pug">
  .settings
    filters-list(
      name="settings"
      v-slot:default="props"
    )
      studio-filter(v-bind="props")
      q-space
      q-btn.col-2.q-btn--no-uppercase(label="Добавить локацию" dense color="primary")
    q-separator
    .row.justify-center
      .col-6
        div(v-show="false") {{ studioID }}
        datas(:datas="singleStudio")
        specifications(:datas="singleStudio")
        images(:datas="singleStudio")
        div(v-if="singleStudio")
        addressBlock(:datas="singleStudio")
        services(:datas="singleStudio")
        equipment(:datas="singleStudio")
        rooms(:datas="singleStudio")
        .row.q-py-lg.justify-center
          q-btn.bg-primary.text-white.q-px-xl.q-mr-sm(label="Сохранить" no-caps)
          q-btn(label="Сохранить и создать зал" no-caps)
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
      tmp: this.$app.filters.getValues('settings').studio,
      singleStudio: {}
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
      this.singleStudio = await studios.getOne(studio).then(resp => resp.data)
      console.log('qqq', this.singleStudio)
    }
  },
  async mounted () {
    this.singleStudioM()
    console.log('qq', this.tmp)
  }
}
</script>
