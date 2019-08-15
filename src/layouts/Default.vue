<template lang="pug">
  q-layout(view="hHh Lpr lFf")
    q-header(elevated)
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
