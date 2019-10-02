<template lang="pug">
  .room
    filters-list(name="settings")
      template(#prepend="props")
        studio-filter(v-bind="props")
      template(#append)
        q-btn.q-btn--no-uppercase(label="Добавить локацию" dense color="primary" @click="$emit('newStudio')")
    .wrapper
      .row.q-pt-md
        .col-3
          .row(v-for="(room, index) in rooms" :key="index")
            q-btn(
              @click="currentRoom=room"
              no-caps
              flat
            ) Зал {{ room.name }}
        .col-6
          roomData(:singleStudio="singleStudio" :allStudiosName="allStudiosName" :currentRoom="currentRoom.name")
          specifications(:singleStudio="singleStudio")
          payment
          images
          interior
          backgrounds
          additionalServices
          services(:singleStudio="singleStudio")
          q-btn.bg-primary.text-white(label="Сохранить" no-caps)
</template>

<script>
import roomData from './roomData'
import specifications from './specifications'
import payment from './payment'
import images from './images'
import interior from './interior'
import backgrounds from './backgrounds'
import additionalServices from './additionalServices'
import services from './services'
import StudioFilter from '../../Filters/StudioFilter'
import FiltersList from '../../Filters/FiltersList'
export default {
  props: {
    rooms: Array,
    singleStudio: Object,
    allStudiosName: Array
  },
  data () {
    return {
      changeRoom: this.rooms[0]
    }
  },
  components: {
    StudioFilter,
    FiltersList,
    roomData,
    specifications,
    payment,
    images,
    interior,
    backgrounds,
    additionalServices,
    services
  },
  computed: {
    currentRoom: {
      get () {
        return this.changeRoom
      },
      set (room) {
        this.changeRoom = room
      }
    }
  }
}
</script>
