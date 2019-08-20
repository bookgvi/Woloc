<template lang="pug">
  .justify-end.items-center
    q-toolbar.row.justify-end.items-center.q-px-md
      q-btn(
        no-caps
        label="Kap's Studios м. Бауманская"
      )
      q-btn(
        no-caps
        label="Залы 6"
      )
      q-btn(
        no-caps
        label="Цели"
      )
      q-btn(
        no-caps
        label="Оплата"
      )
      q-space
      q-btn(
        no-caps
        label="Сбросить все"
      )
    q-separator.q-mt-xs.q-px-none
</template>

<script>

export default {
  name: 'CalendarMenu'
}
</script>

<style scoped lang="stylus">
  /*  .menu
      display block
      background-color #FFFFFF
      width 100%
      height 34px
      box-shadow inset 0 -1px 0 0 rgba(0,0,0,0.1)

   */
</style>
