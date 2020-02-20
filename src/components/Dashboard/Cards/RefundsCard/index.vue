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
              q-checkbox(:value="checkedOptions[index]" @input="hCheck($event, index, item)" dense)
              span &nbsp {{ item.name }}
            td.text-right
              q-icon(
                size="7px"
                name="fas fa-circle"
                style="cursor: pointer; color: #FF8D8D;"
              )
                q-tooltip
                  span.row.text-body2 {{ dateSlot(item.from, item.to) }}
                  span.row &nbsp
                  span.row.text-body2(style="color: #FF8D8D") Возврат {{ expiredDateSlot(item.canceled) }}
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
      STATUS_NEW: 0,
      checkedOptions: [],
      idOfSelectedRefunds: []
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
          id: item.id,
          name: item.booking.customer.fullName,
          check: false,
          value: item.amount,
          status: item.status,
          returnedAt: item.returnedAt,
          from: item.booking.reservedFrom,
          to: item.booking.reservedTo,
          canceled: item.booking.canceled
        }
      })
      return refundsList
    },
  },
  methods: {
    dateSlot (from, to) {
      return this.$moment(from).format('DD MMMM hh:mm') +
        '-' + this.$moment(to).format('hh:mm')
    },
    expiredDateSlot (dt) {
      return this.$moment(dt).format('DD MMMM hh:mm')
    },
    async loadData () {
      await this.$app.refunds.getForDashBoard({ number: 1 }, { statuses: [this.STATUS_NEW] })
    },
    async accept () {
      await this.chainOfRequests('accept')
      this.idOfSelectedRefunds = []
      this.loadData()
    },
    async decline () {
      await this.chainOfRequests('decline')
      this.idOfSelectedRefunds = []
      this.loadData()
    },
    hCheck (e, index, item) {
      this.checkedOptions.splice(index, 1, e)
      const indexOfRefund = this.idOfSelectedRefunds.indexOf(item.id)
      if (indexOfRefund === -1) {
        this.idOfSelectedRefunds.push(item.id)
      } else {
        this.idOfSelectedRefunds.splice(indexOfRefund, 1)
      }
    },
    async chainOfRequests (method) {
      if (method === 'accept') {
        return Promise.all(this.idOfSelectedRefunds.map(id => this.$app.refunds.confirm(id)))
      } else if (method === 'decline') {
        return Promise.all(this.idOfSelectedRefunds.map(id => this.$app.refunds.cancel(id)))
      }
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
