<template lang="pug">
  div.top-btn-container.flex
    div.main-btn.flex.q-mr-auto
      q-btn(
      no-caps
      label="Оплата"
      )
    q-btn.reset-btn(
    no-caps
    label="Сбросить все"
    )
</template>

<script>
export default {
  name: 'UsersMenu',
}
</script>

<style lang="stylus" scoped>
  .top-btn-container
    .q-btn
        border 1px solid #ECECEC
     .reset-btn
        justify-self flex-end
</style>
