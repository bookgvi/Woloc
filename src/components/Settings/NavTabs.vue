<template lang="pug">
  .q-pa-none
    .menu
      q-separator
      q-tabs.q-pa-xs(
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
      q-separator
    .content
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
