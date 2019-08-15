<template lang="pug">
  q-dialog(
    v-model="$app.calendar.dialogs.update"
  )
    q-card(
    )
      q-toolbar
      q-card-section(
        v-if="cards.user_top"
        @click="cards.user_bottom = !cards.user_bottom"
      )
        .text {{ user.name }} {{ user.phone }}
      q-card-section(
        v-if="cards.user_bottom"
      )
        .text {{ user.name }}
        q-input(
          v-model="user.phone"
          readonly
        )
        q-input(
          v-model="user.email"
          readonly
        )
      q-card-section(
        v-if="cards.room_top"
      )
        .text Зал {{ room.name }}
      q-card-section(
        v-if="cards.room_bottom"
      )
        q-option-group(
          v-model="room.name"
          :options="rooms"
          color="green"
        )
      q-card-section(
        v-if="cards.date_top"
      )
        .text Дата {{ booking.date }}
      q-card-section(
        v-if="cards.date_bottom"
      )
        q-date(
          v-model="booking.date"
          minimal
          mask="YYYY-MM-DD"
        )
      q-card-section(
        v-if="cards.time_top"
      )
        .text Время {{ booking.time.from }}-{{ booking.time.to }}
      q-card-section(
        v-if="cards.time_bottom"
      )
        .text Интервал, {{ booking.time.duration }}
        .row
          .col-6
            q-input(
              v-model="user.phone"
              readonly
            )
          .col-6
            q-input(
              v-model="user.email"
              readonly
            )
        .text Зеленым отмечено свободное время.
        q-range(
          v-model="range"
          :min="0"
          :max="50"
          color="green"
        )
      q-card-section(
        v-if="cards.action_top"
      )
        .text Цель {{ booking.action }}
      q-card-section(
        v-if="cards.action_bottom"
      )
        q-option-group(
          v-model="booking.action"
          :options="actions"
          color="green"
        )
      q-card-section(
        v-if="cards.extras_top"
      )
        .text Доп. услуги {{ booking.extras.length }}
      q-card-section(
        v-if="cards.extras_bottom"
      )
        q-option-group(
          v-model="booking.extras"
          :options="extras"
          color="green"
          type="checkbox"
        )
      q-card-section(
        v-if="cards.members_top"
      )
        .text Участники {{ booking.members.length }}
      q-card-section(
        v-if="cards.members_bottom"
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
      q-card-section(
        v-if="cards.price_top"
      )
        .text Оплата {{ booking.price }} р.
      q-card-section(
        v-if="cards.price_bottom"
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
      q-card-section(
        v-if="cards.comment_top"
      )
        .text Коммент
      q-card-section(
        v-if="cards.comment_bottom"
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
      q-card-section(
        v-if="cards.delete_top"
      )
        .text Удалить бронирование
      q-card-section(
        v-if="cards.delete_bottom"
      )
        q-btn.q-mt-sm(
          @click="changeSign"
          color="positive"
          icon="add"
          dense
        )
      q-card-section(
        v-if="cards.user_top"
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
      cards: {
        user_top: true,
        user_bottom: false,
        room_top: true,
        room_bottom: false,
        date_top: true,
        date_bottom: false,
        time_top: true,
        time_bottom: false,
        action_top: true,
        action_bottom: false,
        extras_top: true,
        extras_bottom: false,
        members_top: true,
        members_bottom: false,
        price_top: true,
        price_bottom: false,
        comment_top: true,
        comment_bottom: false,
        delete_top: true,
        delete_bottom: false
      },
      user: {
        name: 'username',
        phone: +7956,
        email: 'gre@ger.ru'
      },
      room: {
        name: 'room 1'
      },
      booking: {
        time: {},
        price: 7777,
        extras: [],
        discount: 0,
        user_comment: 'poidet',
        manager_comment: 'aga',
        members: [
          'Fynjy'
        ]
      },
      rooms: [
        {
          label: 'room 1',
          value: 'room 1'
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

<style scoped>

</style>
