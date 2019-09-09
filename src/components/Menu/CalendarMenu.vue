<template lang="pug">
  .q-px-none
    q-separator

    .wrapper
      .row.items-center.q-py-md.q-gutter-x-sm
        studios-button
        rooms-button
        events-button
        price-button
        q-space
        reset-button
    q-separator
</template>

<script>
import StudiosButton from './Buttons/StudiosButton'
import RoomsButton from './Buttons/RoomsButton'
import EventsButton from './Buttons/EventsButton'
import PriceButton from './Buttons/PriceButton'
import ResetButton from './Buttons/ResetButton'

export default {
  name: 'CalendarMenu',
  components: { StudiosButton, RoomsButton, EventsButton, PriceButton, ResetButton }
}
</script>

<style scoped lang="stylus">

</style>
