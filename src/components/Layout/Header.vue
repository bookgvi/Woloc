<template lang="pug">
  q-toolbar.row.col-12.justify-around.items-center.q-pa-none
    .row.justify-start
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
/*  .header
    display flex
    background-color #FFFFFF
    width 100%
    height 80px
    top 0
    transition margin 500ms, opacity 500ms, visibility .0s
    opacity 1
    margin-top 0
    visibility visible
    border-bottom 1px solid $secondary
 */
</style>
