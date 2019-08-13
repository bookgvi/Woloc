<template lang="pug">
  .row.header.justify-between.items-center
      .col-1
        Logo
      .col-9
        NavTabs
      .col-2
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
  .header
    display flex
    background $primary
    width 100%
    height 80px
    position fixed
    top 0
    z-index 999
    transition margin 500ms, opacity 500ms, visibility .0s
    opacity 1
    margin-top 0
    visibility visible
    border-bottom 2px solid $secondary
    box-shadow inset 0 -1px 0 0 rgba(0,0,0,0.1)
</style>
