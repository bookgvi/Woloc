<template lang="pug">
  .q-pa-none
    .wrapper.wrapper--zero.fixed.z-top(
      style="left: 0; right: 0; background-color: #fff; height: 45px"
    )
      q-separator
      q-tabs(
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
    .wrapper.z-fab
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
        { to: '/settings/extras', label: 'Доп. услуги' },
        { to: '/settings/promo', label: 'Промокоды' },
        { to: '/settings/rules', label: 'Правила' }
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
