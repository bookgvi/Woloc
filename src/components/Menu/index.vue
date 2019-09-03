<template lang="pug">
  .q-px-none
    q-separator

    .wrapper
      .menu.row.items-center.q-py-md.q-gutter-x-sm
        q-btn(
          size="sm"
          outline
          no-caps
          color="black"
          label="Kap's Studios м. Бауманская"
          dense
        )
        q-btn(
          size="sm"
          outline
          color="secondary"
          no-caps
          label="Залы 6"
          dense
        )
        q-btn(
          size="sm"
          outline
          color="secondary"
          no-caps
          label="Цели"
          dense
        )
        q-btn(
          size="sm"
          outline
          color="secondary"
          no-caps
          label="Оплата"
          dense
        )
        q-space
        q-btn(
          size="sm"
          outline
          color="secondary"
          no-caps
          label="Сбросить все"
          dense
        )
    q-separator
</template>

<script>

export default {
  name: 'CalendarMenu'
}
</script>

<style scoped lang="stylus">
  .menu
    .q-btn
      font-size 12px !important

</style>
