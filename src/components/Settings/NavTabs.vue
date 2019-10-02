<template lang="pug">
  .www
    .wrapper.wrapper--header.bg-white.z-top
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
export default {
  name: 'NavTabs',
  data () {
    return {
      settings: [
        { to: '/settings/room', label: 'Залы' }
      ]
    }
  }
}
</script>
