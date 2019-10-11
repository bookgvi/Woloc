<template lang="pug">
  .q-pa-none
    q-card
      q-card-section
        span.row.text-bold.text-body1.q-pt-md.q-pl-sm Промокоды
      q-card-section.q-pb-none
        q-markup-table(
          separator="none"
          dense
          flat
        )
          thead.text-left
            tr
              th(style="width: 80%")
                span.text-bold.text-black.text-body2 Название • Скидка
              th
                span.text-bold.text-black.text-body2 Активен до
          tbody
            tr(
              v-for="(item, index) in options"
              :key="index"
            )
              td {{ nameSlot(index) }}
              td
                span.text-black.text-body2 {{ dateSlot(index) }}
</template>

<script>

export default {
  name: 'PromocodesCard',
  data () {
    return {
      options: [
        {
          name: 'Весна',
          discount: 5,
          date: this.$moment()
        },
        {
          name: 'Весна',
          discount: 5,
          date: this.$moment()
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    nameSlot (index) {
      const item = this.options[index]
      return `${item.name} • ${item.discount}%`
    },
    dateSlot (index) {
      const item = this.options[index]
      return `${this.$moment(item.date).format('DD MMMM, hh:mm')}`
    },
  },
  watch: {
    async selectedDate () {
      await this.loadData()
    },
    studio: {
      async handler () {
        if (this.studio !== 0) {
          await this.loadData()
        }
      },
      immediate: true
    },
  }
}
</script>

<style scoped>

</style>
