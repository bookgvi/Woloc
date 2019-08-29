<template lang="pug">
  q-layout(
    view="hHh Lpr lFf"
    style="width: 1280px; margin: auto"
    )
    q-header.bg-white.text-grey(style="width: 1280px; margin: auto")
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
