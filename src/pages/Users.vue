<template lang="pug">
  q-page(class="q-layout-padding")
    div.top-btn-container.flex
      div.main-btn.flex.q-mr-auto
        q-btn(
          no-caps
          label="Оплата"
        )
      q-btn.reset-btn(
        no-caps
        label="Сбросить все"
      )
    q-separator.q-mt-xs.q-px-none.q-my-md
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
          v-model="current"
          color="primary"
          :max="12"
          :maxPages="3"
          :boundary-numbers="true"
          )
      q-select(
        square
        outlined
        v-model="some"
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
       )
      q-btn(
         outline
         color="secondary"
         class="no-shadow q-mr-md"
         icon="chevron_right"
         :dense="true"
        )
      q-btn(
        color="primary"
        label="Добавить пользователя"
      )
    q-table(
      class="no-shadow"
      :data="data"
      :columns="columns"
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
            p.q-mr-auto {{ props.row.chat }}
            a
              i(class="fas fa-ellipsis-v")
      template(v-slot:bottom)

</template>

<script>
export default {
  name: 'PageUsers',
  data () {
    return {
      options: [10, 50, 100, 250],
      some: 100,
      current: 1,
      search: '',
      columns: [
        {
          name: 'name',
          required: true,
          label: 'ИМЯ',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'rating',
          align: 'center',
          label: 'РЕЙТИНГ',
          sortable: true,
          field: row => row.rating
        },
        { name: 'chat', label: 'ЧАТ', field: 'chat', sortable: true, align: 'left' },
      ],
      data: [
        {
          name: 'Андрей Ревин',
          role: 'Admin',
          rating: 5,
          chat: 'Как мне пронести баллон с гелием в студию для съемки? Возможно ли это и какой порядок …',
        },
        {
          name: 'Антон Куранов',
          role: 'Admin',
          rating: 2,
          chat: 'Как мне пронести баллон с гелием в студию для съемки? Возможно ли это и какой порядок …',
        },
      ],
    }
  }
}
</script>

<style lang="stylus">
  .top-btn-container
    .q-btn
      border 1px solid #ECECEC
    .reset-btn
      justify-self flex-end
  thead tr:first-child th
      opacity 1
      background-color #F5F5F5
  .q-btn
      min-height 40px
      border-radius 0
      box-shadow none
  .q-pagination
      .q-btn
          margin 0 4px
          width 3em
          padding-left 0 !important
          padding-right 0 !important
  button.q-btn--flat
      /* background-color rgba(0, 0, 0, .05) */
      color #4A4A4A !important
      border 1px solid #ECECEC
  table tr td i.fa-star
      color $primary
  table p
      margin 0
</style>
