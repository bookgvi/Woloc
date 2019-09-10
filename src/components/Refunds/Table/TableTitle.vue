<template lang="pug">
  .wrapper
    .row.justify-start.items-center.q-px-none.no-wrap
      .justify-start.items-center
        h5.wrap-md.text-weight-bold Возврат
      q-space
      .justify-end.items-center
        .row.justify-end.q-px-none.q-gutter-sm
          q-input.q-pa-none(
            outlined
            dense=true
            placeholder="Поиск"
            v-model="searchResult"
            )
            template(#prepend)
              q-icon(name="search")
          q-pagination.q-px-sm(
            outlined
            color="primary"
            v-model="pagination.pageCurrent"
            :max="pagination.pageMaxNumber"
            :max-pages="pagination.maxPages"
            boundary-numbers=true
            )
          q-select.q-pa-none(
            outlined
            dense=true
            v-model="rowsPerPage"
            :options="options"
          )
          q-btn-group.q-pa-none(outline)
            q-btn.q-px-sm(
              outline
              icon="chevron_left"
              @click=""
              color="secondary"
            )
            q-separator(vertical inset)
            q-btn.q-px-sm(
              outline
              icon="chevron_right"
              @click=""
              color="secondary"
            )
    TableRefund
</template>

<script>
import TableRefund from './TableRefund'
export default {
  name: 'TableTitle',
  components: {
    TableRefund
  },
  data: () => ({
    searchResult: '',
    pagination: {
      pageCurrent: 1,
      pageMaxNumber: 12,
      maxPages: 3
    },
    rowsPerPage: 100,
    options: [10, 20, 30, 100]
  })
}
</script>

<style lang="stylus" scoped>
</style>
