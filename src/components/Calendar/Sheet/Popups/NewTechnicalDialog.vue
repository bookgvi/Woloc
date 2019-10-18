<template lang="pug">
  q-dialog(
    v-model="dialogState"
    persistent
  )
    q-card.q-py-md(
      style="width: 330px"
    )
      q-card-section
        span.text-bold Быстрая бронь
        calendar-room(
          @roomChange="newBooking.room = $event"
          :filter="filter"
          :startRoom="room.name"
        )
        calendar-comment
        calendar-apply(
          :applyBooking="applyBooking"
          @setQueryState="setQueryState($event)"
        )

</template>

<script>
import CalendarRoom from './Modules/CalendarRoom'
import CalendarComment from './Modules/CalendarComment'
import CalendarApply from './Modules/CalendarApply'
export default {
  name: 'NewTechnicalDialog',
  components: { CalendarApply, CalendarComment, CalendarRoom },
  data () {
    return {
      newBooking: {},
      helpers: {
        date: '',
        time: {
          from: 0,
          to: 0
        }
      },
    }
  },
  computed: {
    room () {
      return (this.newBooking.room) || {}
    }
  },
  methods: {
    setQueryState (state) {
      this.$emit('setQueryState', state)
    },
    setParamsForPost () {
      if (!this.newBooking.customer || !this.newBooking.customer.id) {
        Notify.create({
          message: `Выберите клиента`,
          color: 'negative',
          position: 'bottom-left',
          icon: 'warning'
        })
        return null
      }
      if (!this.newBooking.room) {
        Notify.create({
          message: `Выберите зал`,
          color: 'negative',
          position: 'bottom-left',
          icon: 'warning'
        })
        return null
      }
      if (!this.newBooking.eventType) {
        Notify.create({
          message: `Выберите цель бронирования`,
          color: 'negative',
          position: 'bottom-left',
          icon: 'warning'
        })
        return null
      }
      const params = {
        roomId: this.newBooking.room.id,
        consumerId: this.newBooking.customer.id,
        reserveFrom: this.newBooking.reservedFrom,
        reserveTo: this.newBooking.reservedTo,
        // userComment: this.newBooking.customerComment || '',
        priceType: this.newBooking.eventType,
        extras: [],
        seats: 1,
        description: this.newBooking.managerComment || ''
      }
      // console.log('post', params)
      return params
    },
    async applyBooking () {
      this.newBooking.reservedFrom = this.from
      this.newBooking.reservedTo = this.to
      const payload = this.setParamsForPost()
      if (payload) {
        await this.$app.bookings.addNew(payload)
        if (this.$app.bookings.idOfJustAdded !== 0) {
          this.$emit('setQueryState', true)
        }
      }
      // console.log(9, this.newBooking.id, index)
    }
  },
  props: {
    booking: Object,
    filter: Object,
    dialogState: Boolean,
  },
  watch: {
    booking (v) {
      this.$nextTick(function () {
        console.log(v)
        this.newBooking = Object.assign(v)
        const hDate = this.$moment.parseZone(this.newBooking.reservedFrom).format('YYYY-MM-DD')
        const hFrom = +this.$moment.parseZone(this.newBooking.reservedFrom).format('H')
        let hTo = +this.$moment.parseZone(this.newBooking.reservedTo).format('k')
        this.helpers = Object.assign(this.helpers, {
          date: hDate,
          time: {
            from: hFrom,
            to: hTo
          },
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
