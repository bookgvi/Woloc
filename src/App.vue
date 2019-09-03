<template lang="pug">
  #q-app
    router-view
</template>

<script>

import Vue from 'vue'
import bookings from './controllers/bookings'
import rooms from './controllers/rooms'
import customers from './controllers/customers'
import events from './controllers/events'
import extras from './controllers/extras'

export default {
  name: 'App',
  created () {
    Vue.prototype.$app = this
  },
  data () {
    return {
      bookings: new Vue(bookings),
      rooms: new Vue(rooms),
      customers: new Vue(customers),
      events: new Vue(events),
      extras: new Vue(extras)
    }
  }
}
</script>

<style>
</style>
