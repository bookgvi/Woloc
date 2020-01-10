<template lang="pug">
  q-toolbar.bg-white.row.col-12.justify-around.items-center.q-pa-none9(v-if="isAuthorized")
    .row.justify-start.items-center
      logo
      nav-tabs
    q-space
    .row.justify-end
      user
</template>

<script>
import Logo from './Blocks/Logo'
import User from './Blocks/User'
import NavTabs from './Blocks/NavTabs'
export default {
  name: 'MainMenu',
  components: { NavTabs, User, Logo },
  data () {
    return {
      isAuthorized: true,
      screenWidth: 1920
    }
  },
  watch: {
    '$route.path' (newPath, oldPath) {
      if (newPath === '/login') {
        this.isAuthorized = false
      } else {
        this.isAuthorized = true
      }
    }
  },
  mounted () {
    this.isAuthorized = !(this.$route.path === '/login')
    this.screenWidth = window.screen.width
  }
}
</script>

<style scoped lang="stylus">
</style>
