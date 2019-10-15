<template lang="pug">
  .q-pa-none
    q-card
      name-slot(name="Возвраты")
      q-card-section.q-pt-none
        q-markup-table(
          wrap-cells
          style="min-width: 370px"
          separator="none"
          dense
          flat
        )
          thead.text-left
            tr
              th(style="width: 70%")
              th
              th
          tbody
            tr(
              v-for="(item, index) in options"
              :key="index"
            )
              td
                q-checkbox(v-model="item.check" dense)
                span &nbsp {{ item.name }}
              td
                q-icon(
                  v-if="item.isInfo"
                  size="7px"
                  color="red"
                  name="fas fa-circle"
                  style="cursor: pointer"
                )
                  q-tooltip
                    span.row.text-body2 28 октября 9:00-13:00
                    span.row &nbsp
                    span.row.text-body2.text-red Возврат 28 октября 12:00
              td
                span.text-black.text-body2 {{ item.value }} р.
      q-card-actions.q-pt-none.q-pl-lg
        q-btn.q-mr-xs.col-3.text-body2.text-black(
          outline
          size="sm"
          :disabled="!enabled"
          label="Отклонить"
          no-caps
          @click="decline"
          color="secondary"
        )
        q-btn.q-mr-xs.col-3.text-body2.text-black(
          outline
          size="sm"
          :disabled="!enabled"
          label="Одобрить"
          no-caps
          @click="accept"
          color="secondary"
        )

</template>

<script>
import NameSlot from '../CommonModules/NameSlot'
export default {
  name: 'RefundsCard',
  components: { NameSlot },
  data () {
    return {
      options: [
        {
          name: 'Антон Куранов',
          check: false,
          isInfo: true,
          value: 1600
        },
        {
          name: 'Роман Марков',
          check: false,
          isInfo: false,
          value: 2400
        }
      ]
    }
  },
  computed: {
    enabled () {
      return this.options.some(item => item.check)
    }
  },
  methods: {
    accept () {
      //
    },
    decline () {
      //
    }
  }
}
</script>

<style scoped>

</style>
