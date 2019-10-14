<template lang="pug">
  .q-pa-none
    q-card
      q-card-section.q-pb-none
        span.row.text-bold.text-body1.q-pt-md.q-pl-sm {{ "Финансы"}}
      q-card-section
        q-markup-table(
          style="min-width: 350px"
          wrap-cells
          separator="none"
          dense
          flat
        )
          thead.text-left
            th(style="width: 70%")
            th
          tbody
            tr
              td
                span.text-grey На счету:
              td
                span.text-bold.text-h6 {{ accountSlot }}
            tr
              td
                span.text-grey Ожидается:
              td
                span.text-grey {{ waitingSlot }}
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
                span.text-bold.text-black.text-body2 Операция
              th
                span.text-bold.text-black.text-body2 Сумма, р.
          tbody
            tr
              td Предоплата
              td
                span.text-positive {{ prepaymentSlot }}
            tr
              td Возврат
              td
                span.text-negative {{ refundSlot }}
            tr
              td Штраф
              td
                span.text-negative {{ fineSlot }}

</template>

<script>

export default {
  name: 'FinancesCard',
  data () {
    return {
    }
  },
  computed: {
    accountSlot () {
      return (18600).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
    waitingSlot () {
      return '+ ' + (2500).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
    prepaymentSlot () {
      return (4200).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
    refundSlot () {
      return (6300).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
    fineSlot () {
      return (500).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    }
  }
}
</script>

<style scoped>

</style>
