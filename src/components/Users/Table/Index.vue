<template lang="pug">
  section
    q-toolbar.row.justify-end.q-px-none.q-mb-md
      p(
      class="text-h5 q-ma-none"
      ) Пользователи
      q-input(
      class="offset-1 col-3"
      v-model="search"
      :dense="true"
      square
      outlined
      type="search"
      placeholder="Поиск"
      )
        template(v-slot:prepend)
          q-icon(name="search")
      q-space
      div(
      class="flex flex-center q-mr-md"
      )
        q-pagination(
        v-model="pagination.page"
        class="users-table-pagination"
        color="primary"
        :max="paginationPagesAmount"
        :maxPages="3"
        :boundary-numbers="true"
        )
      q-select(
      square
      outlined
      v-model="pagination.rowsPerPage"
      :options="options"
      :dense="true"
      class="q-mr-md"
      )
      q-btn(
      outline
      color="secondary"
      class="no-shadow"
      icon="chevron_left"
      :dense="true"
      @click="previousPage()"
      )
      q-btn(
      outline
      color="secondary"
      class="no-shadow q-mr-md"
      icon="chevron_right"
      :dense="true"
      @click="nextPage()"
      )
      q-btn(
      color="primary"
      label="Добавить пользователя"
      )
    q-table(
    class="no-shadow users-table-content"
    ref="table"
    :data="data"
    :columns="columns"
    :pagination="pagination"
    row-key="name"
    )
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="name" :props="props")
            p {{ props.row.name }}
          q-td(key="rating" :props="props")
            i(
            v-for="(item,index) in 5"
            class="fa-star"
            :class="index < props.row.rating ? 'fas' : 'far' "
            )
          q-td.flex.items-center(key="chat" :props="props")
            p.user-chat-message {{ props.row.chat }}
            a
              i(class="fas fa-ellipsis-v")
      template(v-slot:bottom)

</template>

<script>
import columns from '../Data/columns'
import data from '../Data/fakeData'

export default {
  name: 'UsersTable',
  created () {

  },
  data () {
    return {
      options: [1, 2, 3, 10],
      search: '',
      columns: columns,
      data: data,
      pagination: {
        page: 1,
        rowsPerPage: 10,
      }
    }
  },
  computed: {
    paginationPagesAmount () { return Math.ceil(this.data.length / this.pagination.rowsPerPage) }
  },
  methods: {
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
