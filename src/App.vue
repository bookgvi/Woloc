<template lang="pug">
  #q-app
    router-view
</template>

<script>

import Vue from 'vue'
import bookings from './controllers/bookings'
import users from './controllers/users'
import login from './controllers/login'
import rooms from './controllers/rooms'
import customers from './controllers/customers'
import events from './controllers/events'
import extras from './controllers/extras'
import studios from './controllers/studios'

export default {
  name: 'App',
  created () {
    Vue.prototype.$app = this
  },
  data () {
    return {
      bookings: new Vue(bookings),
      users: new Vue(users),
      rooms: new Vue(rooms),
      customers: new Vue(customers),
      events: new Vue(events),
      extras: new Vue(extras),
      studios: new Vue(studios),
      login: new Vue(login)
    }
  }
}
</script>

<style>
</style>
