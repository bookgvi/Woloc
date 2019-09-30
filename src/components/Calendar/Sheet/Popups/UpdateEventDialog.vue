<template lang="pug">
  q-dialog(
    v-model="$app.dialogs.calendarUpdate"
    persistent
  )
    q-card.q-py-md(
      style="width: 330px"
    )
      q-list.text-body2.text-black.text-weight-bold(
        dense
      )
        q-expansion-item(
          group="new-event"
          dense
          default-opened
        )
          template(v-slot:header).row.items-center
            .col-4.q-py-sm
              span {{ "Клиент" }}
            .col-7.q-py-sm
              span.text-grey {{ customerSlot }}
          q-card
            q-card-section
              calendar-customer(
                :startCustomer="newBooking.customer"
                @customerChange="newBooking.customer = $event"
              )
        q-expansion-item(
          group="new-event"
          dense
        )
          template(v-slot:header)
            .col-4.q-py-sm
              span {{ "Зал" }}
            .col-7.q-py-sm
              span.text-grey {{ roomSlot }}
          q-card
            q-card-section
              calendar-room(
                @roomChange="newBooking.room = $event"
                :filter="filter"
                :startRoom="room.name"
              )
        q-expansion-item(
          group="new-event"
          dense
        )
          template(v-slot:header)
            .col-4.q-py-sm
              span {{ "Дата" }}
            .col-7.q-py-sm
              span.text-grey {{ dateSlot }}
          q-card
            q-card-section
              calendar-date(
                @dateChange="helpers.date = $event"
                :date="helpers.date"
              )
        q-expansion-item(
          group="new-event"
          dense
        )
          template(v-slot:header)
            .col-4.q-py-sm
              span {{ "Время" }}
            .col-7.q-py-sm
              span.text-grey {{ timeSlot }}
          q-card
            q-card-section
              calendar-time(
                @timeChange="helpers.time = $event"
                :startTime="helpers.time.from"
                :endTime="helpers.time.to"
              )
        q-expansion-item(
          group="new-event"
          dense
        )
          template(v-slot:header)
            .col-4.q-py-sm
              span {{ "Цель" }}
            .col-7.q-py-sm
              span.text-grey {{ eventSlot }}
          q-card
            q-card-section
              calendar-event(
                @eventChange="newBooking.eventType = $event"
                :startEvent="newBooking.eventType"
              )
        q-expansion-item(
          group="new-event"
          dense
        )
          template(v-slot:header)
            .col-4.q-py-sm
              span {{ "Доп. услуги" }}
            .col-7.q-py-sm
              span.text-grey {{ extrasSlot }}
          q-card
            q-card-section
              calendar-extras(
                @extrasChange="helpers.checkedExtras = Object.assign([], $event)"
                :startExtras="Object.assign([], helpers.checkedExtras)"
              )
        q-expansion-item(
          group="new-event"
          dense
        )
          template(v-slot:header)
            .col-4.q-py-sm
              span {{ "Оплата" }}
            .col-7.q-py-sm
              span.text-grey {{priceSlot }}
          q-card
            q-card-section
              calendar-price(
                @priceChange="newBooking.price = $event"
                :extras="extras"
                :fee="fee"
              )
        q-expansion-item(
          group="new-event"
          dense
          label="Коммент"
        )
          q-card
            q-card-section
              calendar-comment(
                @customerCommentChange="newBooking.customerComment = $event"
                :startCustomerComment="newBooking.customerComment"
                @managerCommentChange="newBooking.customerComment = $event"
                :startManagerComment="newBooking.customerComment"
              )
        q-expansion-item(
          group="new-event"
          dense
          label="Удалить бронирование"
        )
          q-card
            q-card-section
              calendar-delete(
                :id="newBooking.id"
                @changeBookingsList="changeBookingsList"
              )
        calendar-apply(
          :applyBooking="applyBooking"
          @changeBookingsList="changeBookingsList"
        )

</template>

<script>
import { date, Notify } from 'quasar'
import { required } from 'vuelidate/lib/validators'
import CalendarCustomer from './Modules/CalendarCustomer'
import CalendarRoom from './Modules/CalendarRoom'
import CalendarDate from './Modules/CalendarDate'
import CalendarTime from './Modules/CalendarTime'
import CalendarEvent from './Modules/CalendarEvent'
import CalendarExtras from './Modules/CalendarExtras'
import CalendarMembers from './Modules/CalendarMembers'
import CalendarPrice from './Modules/CalendarPrice'
import CalendarComment from './Modules/CalendarComment'
import CalendarDelete from './Modules/CalendarDelete'
import CalendarApply from './Modules/CalendarApply'
import { EVENT_TYPES } from 'src/common/constants'

export default {
  name: 'UpdateEventDialog',
  components: { CalendarDelete,
    CalendarComment,
    CalendarPrice,
    CalendarMembers,
    CalendarExtras,
    CalendarEvent,
    CalendarTime,
    CalendarDate,
    CalendarRoom,
    CalendarCustomer,
    CalendarApply
  },
  data () {
    return {
      newBooking: {},
      helpers: {
        date: '',
        checkedExtras: [],
        time: {
          from: 0,
          to: 0
        }
      },
    }
  },
  computed: {
    fee () {
      const duration = this.helpers.time.to - this.helpers.time.from
      let price = 1000
      if (this.newBooking.eventType) {
        price = EVENT_TYPES[this.newBooking.eventType].price
      }
      return {
        name: `${this.newBooking.eventType} ${duration} ч. • ${price} р.`,
        price: duration * price
      }
    },
    room () {
      if (!this.newBooking.room) {
        return {}
      } else {
        return this.newBooking.room
      }
    },
    extras () {
      if (!this.helpers.checkedExtras) {
        return []
      } else {
        return this.helpers.checkedExtras.map(item => {
          return {
            name: item,
            price: this.$app.extras.list.find(extra => extra.name === item).price
          }
        })
      }
    },
    customerSlot () {
      if (this.newBooking.customer && this.newBooking.customer.firstName && this.newBooking.customer.phone) {
        return `${this.newBooking.customer.firstName} ${this.newBooking.customer.phone}`
      } else {
        return 'Введите имя пользователя'
      }
    },
    roomSlot () {
      if (this.newBooking.room) {
        return this.newBooking.room.name
      } else {
        return 'Выберите зал'
      }
    },
    dateSlot () {
      const formatDate = date.formatDate(this.helpers.date, 'D MMMM YYYY')
      return formatDate
    },
    timeSlot () {
      return `${this.helpers.time.from}:00-${this.helpers.time.to}:00`
    },
    eventSlot () {
      if (this.newBooking.eventType) {
        return this.newBooking.eventType
      } else {
        return 'Выберите цель'
      }
    },
    extrasSlot () {
      if (!this.helpers.checkedExtras) return 0
      return this.helpers.checkedExtras.length
    },
    membersSlot () {
      return this.newBooking.members.length
    },
    priceSlot () {
      return `${this.newBooking.price} р.`
    },
    reservedTime () {
      const bookingDate = this.$moment(this.helpers.date)
      const from = this.$moment(bookingDate).hour(this.helpers.time.from).format('YYYY-MM-DDTHH:mm:ss+03:00')
      const to = this.$moment(bookingDate).hour(this.helpers.time.to).format('YYYY-MM-DDTHH:mm:ss+03:00')
      console.log(bookingDate)
      console.log(656, { g: this.helpers.time.from, k: this.helpers.time.to }, { from, to })
      return { from, to }
    }
  },
  methods: {
    changeBookingsList () {
      this.$emit('changeBookingsList')
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
      console.log(this.newBooking.eventType)
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
      console.log('post', params)
      return params
    },
    async applyBooking () {
      this.newBooking.reservedFrom = this.reservedTime.from
      this.newBooking.reservedTo = this.reservedTime.to
      const index = this.$app.bookings.calendarGetIndexById(this.newBooking.id)
      if (index === -1) {
        const payload = this.setParamsForPost()
        if (payload) {
          await this.$app.bookings.addNew(payload)
        }
      } else {
        this.$app.bookings.calendarList[index] =
          Object.assign(this.$app.bookings.calendarList[index], this.newBooking)
        this.$app.dialogs.calendarUpdate = false
      }
      console.log(9, this.newBooking.id, index)
    }
  },
  props: ['booking', 'filter'],
  watch: {
    'booking' (v) {
      this.$nextTick(function () {
        this.newBooking = Object.assign(v)
        const hDate = this.$moment.parseZone(this.newBooking.reservedFrom).format('YYYY-MM-DD')
        const hFrom = +this.$moment.parseZone(this.newBooking.reservedFrom).format('k')
        let hTo = +this.$moment.parseZone(this.newBooking.reservedTo).format('k')
        if (hTo === 0) {
          hTo = 24
        }
        let checkedExtras = []
        if (this.newBooking.extras) {
          checkedExtras = this.newBooking.extras.map(item => item.name)
        }
        this.helpers = Object.assign(this.helpers, {
          date: hDate,
          time: {
            from: hFrom,
            to: hTo
          },
          checkedExtras: Object.assign([], checkedExtras)
        })
      })
    }
  },
  validations: {
    newBooking: {
      customer: { required },
      eventType: { required },
      room: { required }
    }
  }
}
</script>

<style scoped>

</style>
