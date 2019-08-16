<template lang="pug">
  q-popup-proxy
    .update_dialog
      q-card.row.justify-center.items-center(
        v-if="$app.calendar.dialogs.update"
        style="width: 320px;"
      )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="!cards_bottom.user"
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
            v-if="cards_bottom.user"
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
            v-if="cards_top.room"
            @click="sectionToggle('room')"
          )
            .col-11.flex.justify-left.items-center
              .text.text_bald Зал
              .text.text_gray {{ room.name }}
            .col-1
              q-icon(
                v-if="!cards_bottom.room"
                name="keyboard_arrow_down"
              )
              q-icon(
                v-else
                name="keyboard_arrow_up"
              )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_bottom.room"
          )
              q-option-group.col-12.justify-left.items-center(
                v-model="room.name"
                :options="rooms"
                keep-color
              )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_top.date"
            @click="sectionToggle('date')"
          )
            .col-11.flex.justify-left.items-center
              .text.text_bald Дата
              .text.text_gray {{ booking.date }}
            .col-1
              q-icon(
                v-if="!cards_bottom.date"
                name="keyboard_arrow_down"
              )
              q-icon(
                v-else
                name="keyboard_arrow_up"
              )
          card-section.col-12.row.justify-around.items-center(
            v-if="cards_bottom.date"
          )
            q-date(
              v-model="booking.date"
              minimal
              mask="YYYY-MM-DD"
            )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_top.time"
            @click="sectionToggle('time')"
          )
            .col-11.flex.justify-left.items-center
              .text.text_bald Время
              .text.text_gray {{ booking.time.from }}-{{ booking.time.to }}
            .col-1
              q-icon(
                v-if="!cards_bottom.time"
                name="keyboard_arrow_down"
              )
              q-icon(
                v-else
                name="keyboard_arrow_up"
              )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_bottom.time"
          )
            .text.text_small Интервал, {{ +booking.time.to.replace(':00', '') - +booking.time.from.replace(':00', '') }} часа
            .row
              .col-6
                q-input(
                  v-model="booking.time.from"
                )
              .col-6
                q-input(
                  v-model="booking.time.to"
                )
            .col-12.row.text.text_small Зеленым отмечено свободное время.
            q-range(
              v-model="range"
              :min="0"
              :max="50"
              color="green"
            )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_top.action"
            @click="sectionToggle('action')"
          )
            .col-11.flex.justify-left.items-center
              .text.text_bald Цель {{ booking.action }}
            .col-1
              q-icon(
                v-if="!cards_bottom.action"
                name="keyboard_arrow_down"
              )
              q-icon(
                v-else
                name="keyboard_arrow_up"
              )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_bottom.action"
          )
            q-option-group(
              v-model="booking.action"
              :options="actions"
              color="green"
            )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_top.extras"
            @click="sectionToggle('extras')"
          )
            .col-11.flex.justify-left.items-center
              .text.text_bald Доп. услуги {{ booking.extras.length }}
            .col-1
              q-icon(
                v-if="!cards_bottom.extras"
                name="keyboard_arrow_down"
              )
              q-icon(
                v-else
                name="keyboard_arrow_up"
              )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_bottom.extras"
          )
            q-option-group(
              v-model="booking.extras"
              :options="extras"
              color="green"
              type="checkbox"
            )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_top.members"
            @click="sectionToggle('members')"
          )
            .col-11.flex.justify-left.items-center
              .text.text_bald Участники {{ booking.members.length }}
            .col-1
              q-icon(
                v-if="!cards_bottom.members"
                name="keyboard_arrow_down"
              )
              q-icon(
                v-else
                name="keyboard_arrow_up"
              )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_bottom.members"
          )
            template(v-for="(member, index) in booking.members")
              q-input(
                label="member"
                readonly
              )
                q-btn.q-mt-sm(
                  @click="addNewMember"
                  color="positive"
                  icon="add"
                  dense
                )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_top.price"
            @click="sectionToggle('price')"
          )
            .col-11.flex.justify-left.items-center
              .text.text_bald Оплата {{ booking.price }} р.
            .col-1
              q-icon(
                v-if="!cards_bottom.price"
                name="keyboard_arrow_down"
              )
              q-icon(
                v-else
                name="keyboard_arrow_up"
              )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_bottom.price"
          )
            template(v-for="(item, index) in items")
              .row
                .col-9
                  q-input(
                    v-model="item.name"
                    readonly
                  )
                .col-3
                  q-input(
                    v-model="item.price"
                    readonly
                  )
              .text Скидка/надбавка, р.
                .row
                  .col-3
                    q-btn.q-mt-sm(
                      @click="changeSign"
                      color="positive"
                      icon="add"
                      dense
                    )
                  .col-9
                    q-input(
                      v-model="booking.discount"
                    )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_top.comment"
            @click="sectionToggle('comment')"
          )
            .col-11.flex.justify-left.items-center
              .text.text_bald Коммент
            .col-1
              q-icon(
                v-if="!cards_bottom.comment"
                name="keyboard_arrow_down"
              )
              q-icon(
                v-else
                name="keyboard_arrow_up"
              )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_bottom.comment"
          )
            .text Коммент
            q-input(
              v-model="booking.user_comment"
              readonly
            )
            .text Админ
            q-input(
              v-model="booking.manager_comment"
              readonly
            )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_top.delete"
            @click="sectionToggle('delete')"
          )
            .col-11.flex.justify-left.items-center
              .text.text_bald Удалить бронирование
            .col-1
              q-icon(
                v-if="!cards_bottom.delete"
                name="keyboard_arrow_down"
              )
              q-icon(
                v-else
                name="keyboard_arrow_up"
              )
          q-card-section.col-12.row.justify-around.items-center(
            v-if="cards_bottom.delete"
          )
            q-btn.q-mt-sm(
              @click="changeSign"
              color="positive"
              icon="add"
              dense
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
      cards_top: {
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
      cards_bottom: {
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
      booking: {
        price: 7777,
        extras: [],
        discount: 0,
        date: '2019-08-16',
        time: {
          from: '09.00',
          to: '13.00'
        },
        user_comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        manager_comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        members: [
          'Fynjy'
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
        min: 10,
        max: 35
      },
      actions: [],
      extras: [],
      items: []
    }
  },
  methods: {
    sectionToggle (section) {
      for (const key in this.cards_bottom) {
        if (key === section) {
          this.cards_bottom[key] = !this.cards_bottom[key]
        } else {
          this.cards_bottom[key] = false
        }
      }
    },
    changeSign () {
      //
    },
    cancelBooking () {
      //
    },
    saveBooking () {
      //
    },
    addNewMember () {
      //
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
  .text_gray
    color #B5B5B5
    font-size 14px
    font-weight bold
    line-height 18px
</style>
