<template lang="pug">
  .q-px-none
    q-separator

    .wrapper
      .row.items-center.q-py-md.q-gutter-x-sm
        q-btn(
          outline
          no-caps
          color="secondary"
          label="Kap's Studios м. Бауманская"
        )
        q-btn(
          outline
          color="secondary"
          no-caps
          label="Залы 6"
        )
        q-btn(
          outline
          color="secondary"
          no-caps
          label="Цели"
        )
        q-btn(
          outline
          color="secondary"
          no-caps
          label="Оплата"
        )
        q-space
        q-btn(
          outline
          color="secondary"
          no-caps
          label="Сбросить все"
        )
    q-separator
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
