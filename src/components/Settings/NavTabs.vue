<template lang="pug">
  .navTabs
    .q-pa-xs
    q-separator.wrapper.wrapper--zero.fixed(
      style="left: 0; right: 0; background-color: #fff")
    q-tabs.wrapper.wrapper--zero.fixed.z-max(
      style="left: 0; right: 0; background-color: #fff; height: 45px"
      shrink
      bordered
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
        { to: '/settings/location', label: 'Локация' },
        { to: '/settings/room', label: 'Залы' },
        { to: '/settings/extras', label: 'Доп. услуги' }
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
