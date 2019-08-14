<template lang="pug">
  .row.header.justify-between.items-center
    .col-9
      RoomName
    .col-3
      Controls
</template>

<script>
import RoomName from './Blocks/RoomName'
import Controls from './Blocks/Controls'

export default {
  name: 'CalendarDateControls',
  components: { RoomName, Controls }
}
</script>

<style scoped lang="stylus">
  .header
    background $primary
    width 100%
    height 80px
    top 0
    transition margin 500ms, opacity 500ms, visibility .0s
    opacity 1
    margin-top 0
    visibility visible
    border-bottom 2px solid $secondary
    box-shadow inset 0 -1px 0 0 rgba(0,0,0,0.1)
</style>
