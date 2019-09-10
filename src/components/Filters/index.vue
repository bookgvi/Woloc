<template lang="pug">
  .q-px-none
    q-separator
    .wrapper
      .row.items-center.q-py-sm.q-gutter-x-sm
        template(v-for="filter in _filters")
          Button(
            :filter="filters[filter]"
            v-if="filters[filter] !== null"
          )
        // div
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
import Button from './Button'

export default {
  name: 'Filters',
  components: { StudiosButton, RoomsButton, EventsButton, PriceButton, ResetButton, Button },
  data: () => ({
    filters: {
      studios: {
        selected: [],
        type: 'radio',
        items: [
          { name: 'Label 1', id: 100 },
          { name: 'Label 2', id: 101 },
        ]
      },
      rooms: {
        selected: [],
        type: 'checkbox',
        items: [
          { name: 'Label 1', id: 100 },
          { name: 'Label 2', id: 101 },
        ]
      },
      targets: null,
      payment: null,
      additional: null,
      status: null
    }
  }),
  computed: {
    _filters () {
      return Object.keys(this.filters)
        .reduce((acc, key) => {
          this.filters[key] !== null && acc.push(this.filters[key])
          return acc
        }, [])
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
