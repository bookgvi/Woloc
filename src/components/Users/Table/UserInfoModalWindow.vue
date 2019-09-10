<template lang="pug">
  section
    q-dialog(v-model="opened" @before-hide="$emit('closeUserInfoModal')")
      q-card(style="width: 700px; max-width: 80vw;")
        q-card-section(class="q-pa-none q-pl-md row items-center")
          span(class="text-h6 q-pt-sm q-mb-none text-bold section-heading") Личные данные
          q-space
          q-btn(icon="close" class="q-py-md" v-close-popup)
        q-card-section
          div(class="flex justify-between modal-row")
            span(class="modal-row__placeholder") Имя
            span {{ customer.name }}
          div(class="flex justify-between modal-row")
            span(class="modal-row__placeholder") День рождения
            span {{ customer.birth }}
          div(class="flex justify-between modal-row")
            span(class="modal-row__placeholder") Телефон
            span {{ customer.phone }}
          div(class="flex justify-between modal-row")
            span(class="modal-row__placeholder") Эл. почта
            span {{ customer.email }}
          div(class="flex justify-between modal-row")
            span(class="modal-row__placeholder") Скидка
            span {{ customer.sale }}
        q-card-section(class="q-pa-none q-pl-md row items-center")
          span(class="text-h6 q-pt-sm q-mb-none text-bold section-heading") История бронирований
        q-card-section
          div(class="row modal-row")
            span(class="col-4") Всего
            span(class="col-4 text-center") Завершено
            span(class="col-4 text-right") Отменено
          div(class="row modal-row")
            span(class="col-4") 18
            span(class="col-4 text-center") 15
            span(class="col-4 text-right") 1

        q-card-section(class="q-pa-none q-pl-md row items-center")
          span(class="text-h6 q-pt-sm q-mb-none text-bold section-heading") Бронирования
        q-card-section
          div(class="flex justify-between modal-row")
            span 5 марта 2019
            span 2 ч. &#8226; 2500 р.
          div(class="flex justify-between modal-row")
            span 27 апреля 2019
            span 4 ч. &#8226; 1200 р.
          a(href="" @click.prevent class="flex full-width modal-row-link")
            span Посмотреть все в таблице
            q-space
            i(class="fa fa-angle-right")

        q-card-section
          div(class="flex items-center")
            span(class="text-h6 q-pa-none text-bold section-heading") Рейтинг
            span(class="q-ml-md text-primary")
              i(v-for="(item,index) in 5" class="fa-star" :class="index < customer.rating ? 'fas' : 'far' ")
          p(class="q-mt-md") Оставьте комментарий о пользователе

        q-card-section(class="q-mt-sm")
          div(class="row")
            div(class="col q-pr-sm")
              q-btn(unelevated class="full-width" color="primary" label="Редактировать")/
            div(class="col q-pl-sm")
              q-btn(unelevated class="full-width" color="primary" label="Открыть чат")/
</template>

<script>
export default {
  name: 'UserInfoModalWindow',
  props: {
    customer: Object,
    modalOpened: Boolean
  },
  data () {
    return {
      opened: this.modalOpened,
    }
  },
  watch: {
    'modalOpened' (opened) {
      this.opened = opened
    }
  }
}
</script>

<style lang="stylus" scoped>
  .modal-row, .modal-row-link
    box-shadow inset 0 -1px 0 0 rgba(0,0,0,0.1)
    padding 15px 0
  .modal-row__placeholder
    color #9B9B9B
  .modal-row-link i
    font-size 20px
    color #D9D9D9
  .modal-row-link:hover i
    color #4A4A4A
  .q-btn
    min-height 40px
    border-radius 0 !important
    box-shadow none
</style>
