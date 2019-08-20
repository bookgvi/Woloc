<template lang="pug">
  q-dialog
    q-card.row.justify-center.items-center(
      v-if="$app.calendar.dialogs.update"
      style="width: 320px;"
    )
      pre {{}}
      q-card-section.col-12.row.justify-around.items-center(
        v-if="!cardsBottom.user"
        @click="sectionToggle('user')"
      )
        .col-4
          .text.text_bald(
            style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
          ) {{ user.name }}
        .col-7
          .text.text_gray {{ user.phone }}
        .col-1
          q-icon(
            name="keyboard_arrow_down"
          )
      q-card-section.col-12.row.justify-around.items-center(
        v-else
        @click="sectionToggle('user')"
      )
       .col-11
         .text.text_bald(
         ) {{ user.name }}
       .col-1
         q-icon(
           name="keyboard_arrow_up"
         )
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsBottom.user"
      )
        q-input.col-12.row.text.text_small(
          v-model="user.phone"
          readonly
        )
        q-input.col-12.row.text.text_small(
          v-model="user.email"
          readonly
        )
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsTop.room"
        @click="sectionToggle('room')"
      )
        .col-11.flex.justify-left.items-center
          .text.text_bald Зал
          .text.text_gray {{ room.name }}
        .col-1
          q-icon(
            v-if="!cardsBottom.room"
            name="keyboard_arrow_down"
          )
          q-icon(
            v-else
            name="keyboard_arrow_up"
          )
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsBottom.room"
      )
          q-option-group.col-12.justify-left.items-center(
            v-model="room.name"
            :options="rooms"
            keep-color
          )
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsTop.date"
        @click="sectionToggle('date')"
      )
        .col-11.flex.justify-left.items-center
          .text.text_bald Дата
          .text.text_gray {{ booking.date }}
        .col-1
          q-icon(
            v-if="!cardsBottom.date"
            name="keyboard_arrow_down"
          )
          q-icon(
            v-else
            name="keyboard_arrow_up"
          )
      card-section.col-12.row.justify-around.items-center(
        v-if="cardsBottom.date"
      )
        q-date(
          v-model="booking.date"
          minimal
          mask="YYYY-MM-DD"
        )
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsTop.time"
        @click="sectionToggle('time')"
      )
        .col-11.flex.justify-left.items-center
          .text.text_bald Время
          .text.text_gray {{ booking.time.from }}-{{ booking.time.to }}
        .col-1
          q-icon(
            v-if="!cardsBottom.time"
            name="keyboard_arrow_down"
          )
          q-icon(
            v-else
            name="keyboard_arrow_up"
          )
      q-card-section.col-12.row.justify-start.items-center(
        v-if="cardsBottom.time"
      )
        .text.text_small Интервал, {{ booking.time.to - booking.time.from }} часа
        .row
          .col-6
            q-input(
              v-model="range.min"
            )
          .col-6
            q-input(
              v-model="range.max"
            )
        .col-12.row.text.text_extrasmall Зеленым отмечено свободное время.
        q-range(
          v-model="range"
          :min="0"
          :max="24"
          color="green"
        )
      q-card-section.col-12.row.justify-center.items-center(
        v-if="cardsTop.action"
        @click="sectionToggle('action')"
      )
        .col-11.flex.justify-left.items-center
          .text.text_bald Цель
          .text.text_gray {{ booking.action.name }}
        .col-1
          q-icon(
            v-if="!cardsBottom.action"
            name="keyboard_arrow_down"
          )
          q-icon(
            v-else
            name="keyboard_arrow_up"
          )
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsBottom.action"
      )
        .col-7.row.justify-left.items-center
          q-option-group(
            v-model="booking.action"
            :options="actions"
          )
        .col-5.flex.justify-left.items-center
          q-list
            q-item(
              v-for="(action, index) in actions"
              :key="index"
            )
              .text.text_gray {{ action.value.price }} р.
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsTop.extras"
        @click="sectionToggle('extras')"
      )
        .col-11.flex.justify-left.items-center
          .text.text_bald Доп. услуги {{ booking.extras.length }}
        .col-1
          q-icon(
            v-if="!cardsBottom.extras"
            name="keyboard_arrow_down"
          )
          q-icon(
            v-else
            name="keyboard_arrow_up"
          )
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsBottom.extras"
      )
        .col-12.flex.justify-left.items-center
          q-option-group(
            v-model="booking.extras"
            :options="extras"
            color="green"
            type="checkbox"
          )
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsTop.members"
        @click="sectionToggle('members')"
      )
        .col-11.flex.justify-left.items-center
          .text.text_bald Участники {{ booking.members.length }}
        .col-1
          q-icon(
            v-if="!cardsBottom.members"
            name="keyboard_arrow_down"
          )
          q-icon(
            v-else
            name="keyboard_arrow_up"
          )
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsBottom.members"
      )
        template
          .col-12.row.justify-left.items-center
            q-list
              q-item(
                v-for="(member, index) in booking.members"
                :key="index"
              )
                .text.text_small {{ member }}
          .col-11.row.justify-left.items-center
            q-input(
              v-model="newMember"
             )
          .col-1.row.justify-left.items-center
            q-btn.q-mt-sm(
              @click="addNewMember"
              color="#B5B5B5"
              text-color="$primary"
              icon="add"
              dense
            )
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsTop.price"
        @click="sectionToggle('price')"
      )
        .col-11.row.justify-left.items-center
          .text.text_bald Оплата
          .text.text_gray {{ booking.prepayment }} • {{ price }} р.
        .col-1.row.justify-left.items-center
          q-icon(
            v-if="!cardsBottom.price"
            name="keyboard_arrow_down"
          )
          q-icon(
            v-else
            name="keyboard_arrow_up"
          )
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsBottom.price"
      )
        template
          .col-12.row.justify-around.items-center(
            v-for="(item, index) in items"
            :key="index"
          )
            template
              .col-9.row.justify-left.items-center
                .text.text_small {{ item.label }}
              .col-3.row.justify-left.items-center
                .text.text_gray {{ item.value }}
              q-separator(
                dark
              )
          .col-12.row.justify-left.items-center
            .text Скидка/надбавка, р.
            .row
              .col-3
                q-btn.q-mt-sm(
                  @click="changeSign"
                  color="#FFFFFF"
                  text-color="black"
                  label="+/-"
                )
              .col-9
                q-input(
                  square
                  filled
                  v-model="booking.discount"
                )
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsTop.comment"
        @click="sectionToggle('comment')"
      )
        .col-11.flex.justify-left.items-center
          .text.text_bald Коммент
        .col-1
          q-icon(
            v-if="!cardsBottom.comment"
            name="keyboard_arrow_down"
          )
          q-icon(
            v-else
            name="keyboard_arrow_up"
          )
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsBottom.comment"
      )
        .col-12.row.justify-left.items-center
          q-input.col-12(
            v-model="booking.user_comment"
            readonly
            type="textarea"
          )
        .col-12.row.justify-left.items-center
          .text Админ
        .col-12.row.justify-left.items-center
          q-input.col-12(
            v-model="booking.manager_comment"
            filled
            type="textarea"
          )
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsTop.delete"
        @click="sectionToggle('delete')"
      )
        .col-11.flex.justify-left.items-center
          .text.text_bald Удалить бронирование
        .col-1
          q-icon(
            v-if="!cardsBottom.delete"
            name="keyboard_arrow_down"
          )
          q-icon(
            v-else
            name="keyboard_arrow_up"
          )
      q-card-section.col-12.row.justify-around.items-center(
        v-if="cardsBottom.delete"
      )
        q-btn.q-mt-sm(
          @click="changeSign"
          color="#FFFFFF"
          text-color="red"
          no-caps
          label="Удалить"
          full-width
        )
      q-card-section.col-12.row.justify-around.items-center(
      )
        .row
          .col-6
            q-btn.q-mt-sm(
              @click="cancelBooking"
              color="positive"
              label="Отменить"
              dense
            )
          .col-6
            q-btn.q-mt-sm(
              @click="saveBooking"
              color="positive"
              label="Сохранить"
              dense
            )
</template>

<script>
export default {
  name: 'UpdateEventDialog',
  data () {
    return {
      cardsTop: {
        user: true,
        room: true,
        date: true,
        time: true,
        action: true,
        extras: true,
        members: true,
        price: true,
        comment: true,
        delete: true
      },
      cardsBottom: {
        user: false,
        room: false,
        date: false,
        time: false,
        action: false,
        extras: false,
        members: false,
        price: false,
        comment: false,
        delete: false
      },
      user: {
        name: 'Егор Егоров',
        phone: '+7(956)656-65-65',
        email: 'gre@ger.ru'
      },
      room: {
        name: 'Зал 11'
      },
      newMember: '',
      booking: {
        price: 7777,
        action: {
          name: 'Видео',
          price: 1400
        },
        extras: [
          {
            name: 'Фотосъемка',
            price: 1200
          },
          {
            name: 'Набор ванны водой',
            price: 300
          }
        ],
        discount: 500,
        date: '2019-08-16',
        promo: {
          name: 'Kap10',
          value: -570
        },
        prepayment: 4000,
        time: {
          from: 9,
          to: 13
        },
        user_comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud`,
        manager_comment: `
          in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        members: [
          'Андрей Ревин',
          'Антон Куранов',
          'Джим Кэмп',
          'Андрей Владимирович',
          'Куранов Антон',
          'Джим Кэмп'
        ]
      },
      rooms: [
        {
          label: 'Зал 11',
          value: 'Зал 11',
          color: 'purple'
        },
        {
          label: 'Зал 12',
          value: 'Зал 12',
          color: 'pink'
        },
        {
          label: 'Зал 13',
          value: 'Зал 13',
          color: 'yellow'
        },
        {
          label: 'Зал 14',
          value: 'Зал 14',
          color: 'green'
        },
        {
          label: 'Зал 15',
          value: 'Зал 15',
          color: 'blue'
        }
      ],
      range: {
        min: 9,
        max: 13
      },
      actions: [
        {
          label: 'Фотосъемка',
          value: {
            name: 'Фотосъемка',
            price: 1200
          }
        },
        {
          label: 'Видео',
          value: {
            name: 'Видео',
            price: 1400
          }
        },
        {
          label: 'Мероприятие',
          value: {
            name: 'Мероприятие',
            price: 1200
          }
        },
      ],
      extras: [
        {
          label: 'Покраска циклорамы',
          value: {
            name: 'Покраска циклорамы',
            price: 500
          }
        },
        {
          label: 'Набор ванны водой',
          value: {
            name: 'Набор ванны водой',
            price: 300
          }
        },
        {
          label: 'Бумажный фон',
          value: {
            name: 'Бумажный фон',
            price: 400
          }
        },
        {
          label: 'Доп. штатив',
          value: {
            name: 'Доп. штатив',
            price: 350
          }
        }
      ]
    }
  },
  computed: {
    duration () {
      return this.booking.time.to - this.booking.time.from
    },
    prepaymentPercents () {
      return +Number(this.booking.prepayment / this.price * 100).toFixed()
    },
    items () {
      let array = []
      let sum = 0
      const action = {
        label: `${this.duration} ч. • ${this.booking.action.price} р.`,
        value: this.duration * this.booking.action.price
      }
      array.push(action)
      sum += +action.value
      this.booking.extras.forEach((extra) => {
        const bookExtra = {
          label: `${extra.name}, р.`,
          value: +extra.price
        }
        array.push(bookExtra)
        sum += +bookExtra.value
      })
      const promo = {
        label: `Промокод (${this.booking.promo.name})`,
        value: this.booking.promo.value
      }
      array.push(promo)
      sum += promo.value
      const prepayment = {
        label: `Предоплата ${this.prepaymentPercents}%, р.`,
        value: this.booking.prepayment
      }
      array.push(prepayment)
      const total = {
        label: 'Итого',
        value: sum
      }
      array.push(total)
      return array
    },
    price () {
      let price = this.booking.action.price * this.duration -
        this.booking.promo.value
      this.booking.extras.forEach((extra) => {
        price += +extra.price
      })
      return price
    }
  },
  methods: {
    sectionToggle (section) {
      for (const key in this.cardsBottom) {
        if (key === section) {
          this.cardsBottom[key] = !this.cardsBottom[key]
        } else {
          this.cardsBottom[key] = false
        }
      }
    },
    changeSign () {
      console.log(this.booking.discount)
      this.booking.discount = -this.booking.discount
    },
    cancelBooking () {
      //
    },
    saveBooking () {
      //
    },
    addNewMember () {
      this.booking.members.push(this.newMember)
    }
  }

}
</script>

<style scoped lang="stylus">
  .update_dialog
    position fixed
    top 50px
    left 50px
  .text
    padding 0px
    font-family Montserrat
    margin-right 15px
  .text_bald
    color #4A4A4A
    font-size 16px
    font-weight 700
    line-height 19px
  .text_small
    color #4A4A4A
    font-size 14px
    font-weight 500
    line-height 24px
  .text_extrasmall
    color #4A4A4A
    font-size 13px
    font-weight 500
    line-height 24px
  .text_gray
    color #B5B5B5
    font-size 14px
    font-weight bold
    line-height 18px

</style>
