<template lang="pug">
  q-dialog(
    v-model="updateBooking"
    no-backdrop-dismiss=''
  )
    q-card(
      v-if="updateBooking"
    )
      q-toolbar
      q-card-section
         .text {{ user.name }} {{ user.phone }}
      q-card-section
        .text {{ user.name }}
        q-input(
          v-model="user.phone"
          readonly
        )
        q-input(
          v-model="user.email"
          readonly
        )
      q-card-section
        .text Зал {{ room.name }}
      q-card-section
        q-option-group(
          v-model="room.name"
          :options="rooms"
          color="green"
        )
      q-card-section
        .text Дата {{ booking.date }}
      q-card-section
        q-date(
          v-model="booking.date"
          minimal
          mask="YYYY-MM-DD"
        )
      q-card-section
        .text Время {{ booking.time.from }}-{{ booking.time.to }}
      q-card-section
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
      q-card-section
        .text Цель {{ booking.action }}
      q-card-section
        q-option-group(
          v-model="booking.action"
          :options="actions"
          color="green"
        )
      q-card-section
        .text Доп. услуги {{ booking.extras.length }}
      q-card-section
        q-option-group(
          v-model="booking.extras"
          :options="extras"
          color="green"
          type="checkbox"
        )
      q-card-section
        .text Участники {{ booking.members.length }}
      q-card-section
        template(v-for="(member, index) in booking.members")
          q-input(
            v-model="member"
            readonly
          )
            q-btn.q-mt-sm(
              @click="addNewMember"
              color="positive"
              icon="add"
              dense
            )
      q-card-section
        .text Оплата {{ booking.price }} р.
      q-card-section
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
      q-card-section
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
      q-card-section
        .text Удалить бронирование
      q-card-section
        q-btn.q-mt-sm(
          @click="changeSign"
          color="positive"
          icon="add"
          dense
        )
      q-card-section
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
  name: 'UpdateEventDialog'
}
</script>

<style scoped>

</style>
