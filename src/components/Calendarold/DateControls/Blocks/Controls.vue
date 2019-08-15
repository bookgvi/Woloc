<template lang="pug">
  .controls
    q-btn.btn-calendar(
      icon="calendar"
    )
    q-btn.btn-today(
      label="Сегодня"
      no-caps
    )
    q-btn.btn-nav(
      icon="chevron-left"
    )
    q-btn.btn-nav(
      icon="chevron-right"
    )

</template>

<script>
export default {
  name: 'Controls'
}
</script>

<style scoped lang="stylus">
  btn
    color "#FFFFFF"
    text-color $text-black
    border: 1px solid #ECECEC;
  .btn-calendar
    width 40px
    height 40px
    margin-right 30px
  .btn-today
    height 40px
    margin-right 10px
    width 110px
  .btn-nav
    width 40px
    height 40px

</style>
