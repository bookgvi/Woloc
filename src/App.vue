<template lang="pug">
  #q-app
    router-view
</template>

<script>

import Vue from 'vue'
import bookings from './controllers/bookings'

export default {
  name: 'App',
  created () {
    Vue.prototype.$app = this
  },
  data () {
    return {
      bookings: new Vue(bookings)
    }
  }
}
</script>

<style>
</style>
