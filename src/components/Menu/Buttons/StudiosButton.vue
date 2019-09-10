<template lang="pug">
  q-btn(
    size="sm"
    outline
    no-caps
    color="black"
    :label="$app.studios.selectedStudioLabel"
    dense
  )
    q-popup-proxy(
    )
      q-option-group.text-body2.q-pa-md(
        v-model="studio"
        :options="$app.studios.forSelect"
        color="green"
      )
</template>

<script>

export default {
  name: 'StudioButton',
  data () {
    return {
      checkedRooms: [],
      studio: this.$app.studios.studio
    }
  },
  watch: {
    'studio' (v) {
      this.$app.studios.studio = v
    }
  }
}
</script>

<style scoped>

</style>
