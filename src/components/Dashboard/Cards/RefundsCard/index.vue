<template lang="pug">
  standart-card
    name-slot(name="Возвраты").q-pb-none
    q-card-section.q-pa-none
      q-markup-table(
        wrap-cells
        style="min-width: 400px"
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
              q-checkbox(v-model="checkedOptions[index]" dense)
              span &nbsp {{ item.name }}
            td.text-right
              q-icon(
                v-if="item.status.id !== 0"
                size="7px"
                color="red"
                name="fas fa-circle"
                style="cursor: pointer"
              )
                q-tooltip
                  span.row.text-body2 {{ firstDateSlot(item.createdAt) }}
                  span.row &nbsp
                  span.row.text-body2.text-red {{ firstDateSlot(item.returnedAt) }}
            td.text-right
              span.text-black.text-body2 {{ item.value.toLocaleString('ru-RU', { style: 'decimal', useGrouping: true }) }} р.
    q-card-actions.q-pl-md.q-pb-md
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
import StandartCard from '../CommonModules/StandartCard'
export default {
  name: 'RefundsCard',
  components: { StandartCard, NameSlot },
  data () {
    return {
      checkedOptions: []
    }
  },
  async created () {
    await this.loadData()
  },
  computed: {
    enabled () {
      return this.checkedOptions.some(item => item)
    },
    options () {
      const refundsList = this.$app.refunds.dashboardRefundsList.map(item => {
        return {
          name: item.booking.customer.fullName,
          check: false,
          value: item.amount,
          status: item.status,
          createdAt: item.createdAt,
          returnedAt: item.returnedAt
        }
      })
      return refundsList
    },
  },
  methods: {
    firstDateSlot (dt) {
      return this.$moment(dt).format('DD MMMM hh:mm')
    },
    async loadData () {
      await this.$app.refunds.getForDashBoard()
    },
    accept () {
      //
    },
    decline () {
      //
    }
  },
  watch: {
    options: {
      handler (v) {
        this.checkedOptions = Array(v.length).fill(false)
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
