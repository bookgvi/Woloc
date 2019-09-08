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
            a(href="" @click.prevent="showUserInfoModal(props.row.id)" class="name-link") {{ props.row.name }}
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

    user-info-modal-window( :customer="currentCustomer" :modalOpened="modalOpened" @closeUserInfoModal="closeUserInfoModal")

</template>

<script>
import columns from '../Data/columns'
import users from '../Data/fakeData'
import UserInfoModalWindow from './UserInfoModalWindow'

export default {
  name: 'UsersTable',
  components: {
    UserInfoModalWindow
  },
  created () {

  },
  data () {
    return {
      options: [1, 2, 3, 10],
      search: '',
      columns: columns,
      users: users,
      modalOpened: false,
      currentCustomer: {},
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
    showUserInfoModal (index) {
      this.currentCustomer = this.users.find((user) => user.id === index)
      this.modalOpened = true
    },
    closeUserInfoModal () {
      this.currentCustomer = {}
      this.modalOpened = false
    },
    async searchUsers () {
      const response = await this.$app.users.getSearchedCustomers({
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
