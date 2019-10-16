<template lang="pug">
  .q-pa-none
    q-card(style="max-width: 400px")
      name-slot(name="Уведомления")
      q-card-section.q-pa-none.q-pb-md
        q-list(style="max-width: 370px")
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

import NameSlot from '../CommonModules/NameSlot'
export default {
  name: 'NotificationsCard',
  components: { NameSlot },
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
