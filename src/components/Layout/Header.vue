<template lang="pug">
  q-toolbar.row.col-12.justify-around.items-center.q-pa-none
    .row.justify-start.items-center
      Logo
      NavTabs
    q-space
    .row.justify-end
      User
</template>

<script>
import Logo from './Blocks/Logo'
import User from './Blocks/User'
import NavTabs from './Blocks/NavTabs'

export default {
  name: 'Header',
  components: { NavTabs, User, Logo },
  data () {
    return {
      screenWidth: 1920
    }
  },
  mounted () {
    this.screenWidth = window.screen.width
  }
}
</script>

<style scoped lang="stylus">
</style>
