<template lang="pug">
  .location
    filters-list(name="settings")
      template(#prepend="props")
        studio-filter(v-bind="props")
      template(#append)
        q-btn.q-btn--no-uppercase(label="Добавить локацию" dense color="primary" @click="$emit('newStudio')")
    .wrapper
      .row.justify-center.q-pb-md
        .col-6
          dataBlock(:singleStudio="singleStudio")
          specifications(:singleStudio="singleStudio")
          images
          addressBlock(:singleStudio="singleStudio")
          services(:services="services")
          equipment(:vendors="vendors")
          rooms(:rooms="rooms")

          q-btn.bg-primary.text-white.q-px-xl.q-mr-sm(
            label="Сохранить"
            no-caps
            @click="$emit('updateStudio', services, vendors)"
            :disable='isSave'
          )
          q-btn.q-mr-sm(
            label="Сохранить и создать зал"
            no-caps
            :disable='!isSave'
            @click="$emit('createNewStudio')"
          )
</template>

<script>
import dataBlock from './data'
import specifications from './specifications'
import images from './images'
import addressBlock from './address'
import services from '../Room/services'
import equipment from './equipment'
import rooms from './rooms'
import StudioFilter from '../../Filters/StudioFilter'
import FiltersList from '../../Filters/FiltersList'

export default {
  components: {
    dataBlock,
    specifications,
    images,
    addressBlock,
    services,
    equipment,
    rooms,
    StudioFilter,
    FiltersList
  },
  props: {
    singleStudio: Object,
    services: Array,
    vendors: Array,
    rooms: Array,
    studioID: Number,
    isSave: Boolean
  },
  data () {
    return {}
  }
}
</script>
