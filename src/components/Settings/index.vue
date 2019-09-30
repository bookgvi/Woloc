<template lang="pug">
  .settings
    .wrapper
      .row
        q-tabs(
          v-model="currentTab"
        )
          q-tab(
            v-for="(tab, index) in tabs"
            :key="index"
            :label="tab"
            :name="tab"
            no-caps
          )
    q-tab-panels(v-model="currentTab")
      q-tab-panel.q-pa-none(name="Локация")
        location
      q-tab-panel(name="Залы")
        room
</template>

<script>
import location from './Location'
import room from './Room'
export default {
  name: 'setting',
  components: { location, room },
  data: () => ({
    currentTab: 'Локация',
    tabs: ['Локация', 'Залы']
  })
}
</script>
