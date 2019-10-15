<template lang="pug">
  .q-pa-none
    q-card
      name-slot(name="Промокоды")
      q-card-section
        q-markup-table(
          style="min-width: 350px"
          wrap-cells
          separator="none"
          dense
          flat
        )
          thead.text-left
            tr
              th(style="width: 70%")
                span.text-bold.text-black.text-body2 Название • Скидка
              th
                span.text-bold.text-black.text-body2 Активен до
          tbody
            tr(
              v-for="(item, index) in options"
              :key="index"
            )
              td {{ nameSlot(index) }} &nbsp
                span.text-body2.bg-cyan-3.q-pa-xs(
                  v-if="!item.isActive"
                ) ugoloc
              td
                span.text-black.text-body2(
                  v-if="item.isActive"
                ) {{ dateSlot(index) }}
                span.text-cyan-3.text-body2(
                  v-else
                  class="cursor-pointer"
                ) Активировать
</template>

<script>

import NameSlot from '../CommonModules/NameSlot'
export default {
  name: 'PromocodesCard',
  components: { NameSlot },
  data () {
    return {
      options: [
        {
          name: 'Весна',
          discount: 5,
          date: this.$moment().add(99, 'days'),
          isActive: true
        },
        {
          name: 'Май15',
          discount: 15,
          date: this.$moment().add(235, 'days'),
          isActive: true
        },
        {
          name: 'Подарок10',
          discount: 10,
          date: this.$moment().add(235, 'days'),
          isActive: false
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
}
</script>

<style scoped>

</style>
