<template lang="pug">
  .q-pa-none
    q-card
      q-card-section
        span.row.text-bold.text-body1.q-pt-md.q-pl-sm Уведомления
      q-card-section
        q-list(style="max-width: 400px")
          q-item(
            v-for="(item, index) in options"
            :key="index"
          )
            q-item-section
              q-item-label
                span.text-body2 {{ item.text }}
              q-item-label
                a.text-body2.text-cyan-3(
                    style="cursor: pointer"
                    :href="item.link"
                  ) {{ item.action }}
</template>

<script>

export default {
  name: 'NotificationsCard',
  data () {
    return {
      messages: [
        {
          action: 'Синхронизировать',
          text: 'Необходима синхронизация календарей. Это поможет следить за актуальностью расписания в локациях.'
        },
        {
          action: 'Добавить',
          text: 'Добавьте новые скидки и промокоды, чтобы повысить интерес к вашей локации.'
        },
      ]
    }
  },
  computed: {
    options () {
      return this.messages
    }
  }
}
</script>

<style scoped>

</style>
