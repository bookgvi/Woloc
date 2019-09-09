<script>
import RowDialog from 'components/UcTable/RowDialog'

export default {
  name: 'CustomersDialog',
  components: { RowDialog },
  props: {
    getTitle: Function,
    row: {
      type: Object,
      default: () => ({}),
    },
    details: Array,
    readonly: Boolean,
  },
}
</script>

<template lang="pug">
  RowDialog(v-bind="$props")
    q-card-section.q-px-none
      .row
        .text-h6.text-bold История бронирований
    q-card-section.q-px-none
      .row.modal-row
        .col-4 Всего
        .col-4.text-center Завершено
        .col-4.text-right Отменено
      .row.modal-row
        .col-4 18
        .col-4.text-center 15
        .col-4.text-right 1

    q-card-section.q-px-none
      .row
        .text-h6.text-bold Бронирования
    q-card-section.q-px-none
      .row.modal-row
        span 5 марта 2019
        span 2 ч. &#8226; 2500 р.
      .row.modal-row
        span 27 апреля 2019
        span 4 ч. &#8226; 1200 р.
      .row.modal-row
        a.flex.full-width(href="#" @click.prevent)
          span Посмотреть все в таблице
          q-space
          i.fa.fa-angle-right

    q-card-section.q-px-none
      .row
        .text-h6.text-bold Рейтинг
          .q-ml-md.color-primary.inline-block.text-body1
            i.fa-star(v-for="(item,index) in 5" :class="index < row.rating ? 'fas' : 'far' ")
      p.q-mt-md Оставьте комментарий о пользователе

    template(v-slot:actions)
      .col.q-pr-sm
        q-btn.full-width(unelevated color="primary" label="Редактировать")
      .col.q-pl-sm
        q-btn.full-width(unelevated color="primary" label="Открыть чат")
</template>

<style lang="stylus" scoped>
  .modal-row
    border-bottom #e5e5e5 solid 1px
    padding 15px 0
    font-size 16px

    a i
      color #D9D9D9

    a:hover i
      color #4A4A4A
</style>
