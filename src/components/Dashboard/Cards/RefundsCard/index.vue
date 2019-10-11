<template lang="pug">
  .q-pa-none
    q-card
      q-card-section
        span.row.text-bold.text-body1.q-pt-md.q-pl-sm Возвраты
      q-card-section
        q-markup-table(
          separator="none"
          style="max-width: 400px"
          dense
          flat
        )
          thead.text-left
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
                )
              td
                span.text-black.text-body2 {{ item.value }} р.
      q-card-actions.q-pt-none.q-pl-lg
        q-btn.q-mr-xs.col-3.text-body2.text-black(
          outline
          size="sm"
          label="Отклонить"
          no-caps
          @click="decline"
          color="secondary"
        )
        q-btn.q-mr-xs.col-3.text-body2.text-black(
          outline
          size="sm"
          label="Одобрить"
          no-caps
          @click="accept"
          color="secondary"
        )

</template>

<script>
export default {
  name: 'RefundsCard',
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
