<template lang="pug">
  section
    q-toolbar.row.justify-end.q-px-none.q-mb-md
      p(class="text-h5 q-ma-none") Пользователи
      q-input(class="offset-1 col-3" v-model="search" :dense="true" square outlined type="search" placeholder="Поиск")
        template(v-slot:prepend): q-icon(name="search")
      q-space
      div(class="flex flex-center q-mr-md")
        q-pagination(
        v-model="pagination.page"
        class="users-table-pagination"
        color="primary"
        :max="paginationPagesAmount"
        :maxPages="3"
        :boundary-numbers="true"
        )
      q-select(square outlined :options="options" :dense="true" class="q-mr-md" v-model="pagination.rowsPerPage")
      q-btn(outline color="secondary" class="no-shadow" icon="chevron_left" :dense="true" @click="previousPage()")
      q-btn(outline color="secondary" class="no-shadow q-mr-md" icon="chevron_right" :dense="true" @click="nextPage()")
      q-btn(color="primary" label="Добавить пользователя")
    q-table(
    class="no-shadow users-table-content"
    ref="table"
    :data="users"
    :columns="columns"
    :pagination="pagination"
    row-key="name"
    )
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(auto-width key="name" :props="props")
            a(href="" @click.prevent="showModal(props.row.id)" class="name-link") {{ props.row.name }}
          q-td(key="rating" :props="props")
            i(v-for="(item,index) in 5" class="fa-star" :class="index < props.row.rating ? 'fas' : 'far' ")
          q-td(auto-width)
            div.flex.items-center(class="w-75em" key="chat" :props="props")
              p.user-chat-message {{ props.row.chat }}
          q-td(auto-width)
            div.flex.items-center(key="chat" :props="props")
              q-btn(@click.prevent round)
                i(class="fas fa-ellipsis-v")
                q-menu(id="context-menu" :content-style="{ 'border-radius': '7px', background: 'rgba(239,239,239,1)' }" anchor="center right" self="center left")
                  q-list(class="flex")
                    q-item(clickable v-close-popup)
                      q-tooltip(transition-show="fade" content-style="background-color: #4C4C4C" self="center middle") Редактировать
                      q-item-section(anchor="top right")
                        i(class="fas fa-pen")
                    q-item(clickable v-close-popup)
                      q-tooltip(transition-show="fade" content-style="background-color: #4C4C4C" self="center middle") Позвонить
                      q-item-section(self="top left")
                        i(class="fas fa-phone")
                    q-item(clickable v-close-popup)
                      q-tooltip(transition-show="fade" content-style="background-color: #4C4C4C" self="center middle") Отправить E-mail
                      q-item-section(self="top left")
                        i(class="fas fa-envelope")
                    q-item(clickable v-close-popup)
                      q-tooltip(transition-show="fade" content-style="background-color: #4C4C4C" self="center middle") Открыть чат
                      q-item-section(self="top left")
                        i(class="fas fa-comment-alt")
      template(v-slot:bottom)

    q-dialog(v-model="modalOpened")
      q-card(style="width: 700px; max-width: 80vw;")
        q-card-section(class="q-pa-none q-pl-md row items-center")
          span(class="text-h6 q-pt-sm q-mb-none text-bold section-heading") Личные данные
          q-space
          q-btn(icon="close" class="q-py-md" v-close-popup)
        q-card-section
          div(class="flex justify-between modal-row")
            span(class="modal-row__placeholder") Имя
            span {{ currentUser.name }}
          div(class="flex justify-between modal-row")
            span(class="modal-row__placeholder") День рождения
            span {{ currentUser.birth }}
          div(class="flex justify-between modal-row")
            span(class="modal-row__placeholder") Телефон
            span {{ currentUser.phone }}
          div(class="flex justify-between modal-row")
            span(class="modal-row__placeholder") Эл. почта
            span {{ currentUser.email }}
          div(class="flex justify-between modal-row")
            span(class="modal-row__placeholder") Скидка
            span {{ currentUser.sale }}
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
            span(class="q-ml-md color-primary")
              i(v-for="(item,index) in 5" class="fa-star" :class="index < currentUser.rating ? 'fas' : 'far' ")
          p(class="q-mt-md") Оставьте комментарий о пользователе

        q-card-section(class="q-mt-sm")
          div(class="row")
            div(class="col q-pr-sm")
              q-btn(unelevated class="full-width" color="primary" label="Редактировать")/
            div(class="col q-pl-sm")
              q-btn(unelevated class="full-width" color="primary" label="Открыть чат")/

</template>

<script>
import columns from '../Data/columns'
import users from '../Data/fakeData'

export default {
  name: 'UsersTable',
  created () {

  },
  data () {
    return {
      options: [1, 2, 3, 10],
      search: '',
      columns: columns,
      users: users,
      modalOpened: false,
      currentUser: {},
      pagination: {
        page: 1,
        rowsPerPage: 10,
      }
    }
  },
  computed: {
    paginationPagesAmount () { return Math.ceil(this.users.length / this.pagination.rowsPerPage) },
  },
  methods: {
    showModal (index) {
      this.currentUser = this.users.find((user) => user.id === index)
      this.modalOpened = true
    },
    async searchUsers () {
      const response = await this.$app.users.getSearchedUsers({
        search: this.search,
      })
      this.users = response.users
    },
    previousPage () {
      if (this.pagination.page > 1) {
        --this.pagination.page
      }
    },
    nextPage () {
      if (this.pagination.page < this.paginationPagesAmount) {
        ++this.pagination.page
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  //Modal window
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
  // Table
  .name-link
    text-decoration none
    color #4A4A4A
  .user-chat-message
    margin-right auto !important
    overflow hidden
    text-overflow ellipsis
  .q-btn
    min-height 40px
    border-radius 0 !important
    box-shadow none
  button.q-btn--flat
    color #4A4A4A !important
    border 1px solid #ECECEC
  table tr td i.fa-star
    color $primary
  table p
    margin 0
  .user-chat-message
    margin-right auto !important
</style>

<style lang="stylus">
  thead tr:first-child th
    opacity 1
    background-color #F5F5F5
  .q-pagination.users-table-pagination
    .q-btn
      margin 0 4px
      width 3em
      padding-left 0
      padding-right 0
      border-radius 0
</style>
