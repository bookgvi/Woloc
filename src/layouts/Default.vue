<template lang="pug">
  q-layout(
    view="hHh Lpr lFf"
    style="min-width: 1280px"
    )
    q-header.bg-white.text-grey(elevated height-hint="61.59" style="min-width: 1280px")
      Header
    q-page-container
      router-view
</template>

<script>
import Header from '../components/Layout/Header'

export default {
  name: 'DefaultLayout',
  components: { Header }
}
</script>

<style scoped lang="stylus">
</style>
