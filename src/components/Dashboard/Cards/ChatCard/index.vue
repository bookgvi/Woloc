<template lang="pug">
  .q-pa-none
    q-card
      q-card-section
        span.row.text-bold.text-body1.q-pt-md.q-pl-sm Чат
      q-card-section
        q-list(style="max-width: 350px")
          q-item(
            v-for="(item, index) in options"
            :key="index"
          )
            q-item-section
              q-item-label
                span.text-bold.text-body2 {{ item.author }}
                span &nbsp
                span.text-body2.bg-cyan-3.q-pa-xs(
                  v-if="item.isAdmin"
                ) Админ
              q-item-label(
                lines="1"
              )
                span.text-body2 {{ item.text }}
            q-item-section(
              side
              v-if="item.isUnread"
            )
              q-icon(
                size="7px"
                color="red"
                name="fas fa-circle"
              )
</template>

<script>

import { messages } from './messages'

export default {
  name: 'ChatCard',
  data () {
    return {
      messages: messages
    }
  },
  computed: {
    options () {
      return this.messages.map(item => {
        return {
          author: item.author,
          isAdmin: item.isAdmin,
          isUnread: item.isUnread,
          text: item.text
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
