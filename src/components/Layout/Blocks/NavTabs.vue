<template lang="pug">
  q-tabs(
    shrink
    align="justify"
    animated
    no-caps
    active-color="black"
    narrow-indicator
    dense
  )
    q-route-tab.q-px-sm(
      v-for="(route, index) in routes"
      :key="index"
      :to="route.to"
      :label="route.label"
    )

</template>

<script>
export default {
  name: 'NavTabs',
  data () {
    return {
      routes: [
        { to: '/', label: 'Дашборд' },
        { to: '/customers', label: 'Пользователи' },
        { to: '/calendar', label: 'Календарь' },
        { to: '/bookings', label: 'Бронирования' },
        { to: '/invoices', label: 'Заявки' },
        { to: '/finances', label: 'Финансы' },
        { to: '/refunds', label: 'Возврат' },
        { to: '/documents', label: 'Документы' },
        { to: '/settings', label: 'Настройки' },
      ]
    }
  }
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
