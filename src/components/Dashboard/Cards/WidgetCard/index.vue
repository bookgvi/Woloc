<template lang="pug">
  .q-pa-none
    q-card(style="max-width: 400px")
      name-slot(name="JS Widget")
      q-card-section
        span.text-body2 Вы можете создать виджет вашей  локации или зала и вставить его на любой сайт.
</template>

<script>

import NameSlot from '../CommonModules/NameSlot'
export default {
  name: 'WidgetCard',
  components: { NameSlot }
}
</script>

<style scoped>

</style>
