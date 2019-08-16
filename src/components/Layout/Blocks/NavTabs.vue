<template lang="pug">
  q-tabs(
    swipeable
    animated
    class="tabs"
    no-caps
    active-color="black")
    q-route-tab(to="/" label="Дашборд")
    q-route-tab(to="/users" label="Пользователи")
    q-route-tab(to="/calendar" label="Календарь")
    q-route-tab(to="/bookings" label="Бронирования")
    q-route-tab(to="/invoices" label="Заявки")
    q-route-tab(to="/finances" label="Финансы")
    q-route-tab(to="/refunds" label="Возврат")
    q-route-tab(to="/documents" label="Документы")
    q-route-tab(to="/settings" label="Настройки")
</template>

<script>
export default {
  name: 'NavTabs'
}
</script>

<style scoped lang="stylus">
  .tabs
    width 100%
    height 78px
    font-size 14px
    color #9b9b9b
    font-family Montserrat
    font-weight: 500
    letter-spacing -0.3px
    line-height 18px

</style>
