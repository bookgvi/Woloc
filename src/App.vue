<template lang="pug">
  #q-app
    router-view
</template>

<script>

import Vue from 'vue'
import calendar from './controllers/calendar'

export default {
  name: 'App',
  created () {
    Vue.prototype.$app = this
  },
  data () {
    return {
      calendar: new Vue(calendar)
    }
  }
}
</script>

<style>
</style>
