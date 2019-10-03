<template lang="pug">
  .wrapper
    q-tabs(
      shrink
      align="left"
      animated
      no-caps
      active-color="black"
      narrow-indicator
      dense
    )
      q-route-tab(
        v-for="(route, index) in settings"
        :key="index"
        :to="route.to"
        :label="route.label"
      )
    router-view
</template>

<script>
import room from './Room'
export default {
  name: 'NavTabs',
  components: { room },
  data () {
    return {
      settings: [
        { to: '/settings/room', label: 'Залы' }
      ]
    }
  }
}
</script>

<style>
  body {
    overflow-x: hidden;
  }
</style>
