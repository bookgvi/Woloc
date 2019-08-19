<template lang="pug">
    q-tabs(
      shrink
      align="left"
      animated
      no-caps
      active-color="black"
    )
      q-route-tab.q-px-xs(to="/" label="Дашборд")
      q-route-tab.q-px-xs(to="/users" label="Пользователи")
      q-route-tab.q-px-xs(to="/calendar" label="Календарь")
      q-route-tab.q-px-xs(to="/bookings" label="Бронирования")
      q-route-tab.q-px-xs(to="/invoices" label="Заявки")
      q-route-tab.q-px-xs(to="/finances" label="Финансы")
      q-route-tab.q-px-xs(to="/refunds" label="Возврат")
      q-route-tab.q-px-xs(to="/documents" label="Документы")
      q-route-tab.q-px-xs(to="/settings" label="Настройки")
</template>

<script>
export default {
  name: 'NavTabs'
}
</script>

<style scoped lang="stylus">
/*  .tabs
    width 100%
    height 78px
    font-size 14px
    color #9b9b9b
    font-family Montserrat
    font-weight: 500
    letter-spacing -0.3px
    line-height 18px
*/
</style>
