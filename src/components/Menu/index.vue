<template lang="pug">
  .q-px-none
    q-separator

    .wrapper
      .row.items-center.q-py-md.q-gutter-x-sm
        studios-button
        rooms-button
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
import StudiosButton from './Buttons/StudiosButton'
import RoomsButton from './Buttons/RoomsButton'

export default {
  name: 'CalendarMenu',
  components: { StudiosButton, RoomsButton }
}
</script>

<style scoped lang="stylus">

</style>
