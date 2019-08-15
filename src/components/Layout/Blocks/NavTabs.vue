<template lang="pug">
  q-tabs(swipeable animated class="tabs" no-caps active-color="black")
    q-route-tab.tab(to="/" label="Дашборд")
    q-route-tab.tab(to="/users" label="Пользователи")
    q-route-tab.tab(to="/calendar" label="Календарь")
    q-route-tab.tab(to="/bookings" label="Бронирования")
    q-route-tab.tab(to="/invoices" label="Заявки")
    q-route-tab.tab(to="/finances" label="Финансы")
    q-route-tab.tab(to="/refunds" label="Возврат")
    q-route-tab.tab(to="/documents" label="Документы")
    q-route-tab.tab(to="/settings" label="Настройки")
</template>

<script>
export default {
  name: 'NavTabs'
}
</script>

<style scoped lang="stylus">
  .tabs
    height 78px
    font-size 14px
    color #9b9b9b
    font-family Montserrat
    font-weight: 500
    letter-spacing -0.3px
    line-height 18px

  .tab
    padding 0
    margin 0 10px 0 10px
</style>
