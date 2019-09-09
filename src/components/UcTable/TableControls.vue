<script>
export default {
  name: 'TableControls',
  props: {
    pagesNumber: Number,
    isFirstPage: Boolean,
    isLastPage: Boolean,
    pagination: Object,
    prevPage: Function,
    nextPage: Function,
    setPagination: Function,
  },
  data () {
    return {
      options: [10, 50, 100, 250],
    }
  }
}
</script>

<template lang="pug">
  .table-controls.row
    q-input.q-mr-sm(
      :dense="true"
      square
      outlined
      type="search"
      placeholder="Поиск"
    )
      template(#prepend)
        q-icon(name="search")

    q-pagination(
      color="black"
      width=""
      :max="pagesNumber"
      :maxPages="3"
      :boundary-numbers="true"
      :value="pagination.page"
      @input="(value) => setPagination('page', value)"
    )
    q-select.q-mx-md(
      :value="pagination.rowsPerPage"
      :options="options"
      :dense="true"
      @input="(value) => setPagination('rowsPerPage', value)"
      outlined
    )
    q-btn.square(
      flat
      color="secondary"
      class="no-shadow"
      icon="chevron_left"
      :dense="true"
      :disable="isFirstPage"
      @click="prevPage"
    )
    q-btn.square(
      flat
      color="secondary"
      class="no-shadow"
      icon="chevron_right"
      :dense="true"
      :disable="isLastPage"
      @click="nextPage"
    )

    slot
</template>

<style lang="stylus">
.table-controls
  .q-btn.square, .q-pagination .q-btn
    width 3em
    padding 7px 16px !important
    font-weight bold
  .q-btn--flat
    border $grey-12 solid 1px
  .q-btn--standard
    border none
    background-color $primary !important
    box-shadow none
  .q-pagination .q-btn
    margin 0 4px

  .q-select
    .q-field__native
      font-weight bold

  .q-field__control
    input
      font-weight bold

  .q-field__control:before
    border-color $grey-12
</style>
