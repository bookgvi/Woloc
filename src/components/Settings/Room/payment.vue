<template lang="pug">
  .payment
    .row.q-pb-lg
      .col
        .text-h6.q-pb-md Оплата
        q-btn.bg-primary.text-white(label="Открыть календарь цен" no-caps)
          q-popup-proxy(v-model="isModal" :offset="[100, 0]")
            q-card
              priceCalendar(@hide="isModal = false")
</template>

<script>
import priceCalendar from './priceCalendar'
export default {
  name: 'payment',
  components: { priceCalendar },
  data: () => ({
    isModal: false
  })
}
</script>
