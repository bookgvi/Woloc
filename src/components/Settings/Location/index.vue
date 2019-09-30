<template lang="pug">
  .location
    .row.justify-center
      .col-6
        dataBlock(:singleStudio="singleStudio")
        specifications(:singleStudio="singleStudio")
        images
        addressBlock(:singleStudio="singleStudio")
        services(:singleStudio="singleStudio")
        equipment(:singleStudio="singleStudio")
        rooms(:rooms="rooms")
    .row.q-py-lg.justify-center
      q-btn.bg-primary.text-white.q-px-xl.q-mr-sm(label="Сохранить" no-caps @click="$emit('updateStudio')")
      q-btn.q-mr-sm(label="Сохранить и создать зал" no-caps disable)
      q-btn.col-2.q-btn--no-uppercase(label="Добавить локацию" dense color="primary" disable)
</template>

<script>
import dataBlock from './data'
import specifications from './specifications'
import images from './images'
import addressBlock from './address'
import services from './services'
import equipment from './equipment'
import rooms from './rooms'

export default {
  components: {
    dataBlock,
    specifications,
    images,
    addressBlock,
    services,
    equipment,
    rooms
  },
  props: {
    singleStudio: Object,
    rooms: Array,
    studioID: Number
  },
  data () {
    return {
    }
  }
}
</script>
