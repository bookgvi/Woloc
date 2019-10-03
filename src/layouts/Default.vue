<template lang="pug">
  q-layout(view="hHh LPr lFf")
    q-header.bg-white.text-grey
      .wrapper.wrapper--header
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
  .q-header
    background none !important
</style>
