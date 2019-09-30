<template lang="pug">
  .settings
    .wrapper
      q-separator
      .row.q-py-sm
        q-btn(
          v-for="(item, index) in tags"
          :key="index"
          :label="item"
          @click="currentTag=item"
          dense
          no-caps
        )
      .row
        q-separator
    .row
      .inline-block(
        :is="currentTag"
      )
</template>

<script>
import location from './Location'
import room from './Room'
export default {
  name: 'settings',
  components: { location, room },
  data: () => ({
    currentTag: 'location',
    tags: [location, room]
  })
}
</script>
