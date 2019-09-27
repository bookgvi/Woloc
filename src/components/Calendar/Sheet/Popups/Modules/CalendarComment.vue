<template lang="pug">
  .q-py-md
    .col-12.row.justify-left.items-center
      q-input.col-12(
        v-model="customerComment"
        readonly
        filled
        type="textarea"
      )
    .col-12.row.justify-left.items-center
      .text-body2 Админ
    .col-12.row.justify-left.items-center
      q-input.col-12(
        v-model="managerComment"
        filled
        type="textarea"
      ) {{ customerCommentComp }} {{ managerCommentComp }}
</template>

<script>
export default {
  name: 'CalendarComment',
  data () {
    return {
      customerComment: '',
      managerComment: ''
    }
  },
  computed: {
    customerCommentComp () {
      return this.customerCommentChange()
    },
    managerCommentComp () {
      return this.managerCommentChange()
    }
  },
  methods: {
    customerCommentChange () {
      this.$emit('customerCommentChange', this.customerComment)
    },
    managerCommentChange () {
      this.$emit('managerCommentChange', this.managerComment)
    }
  },
  props: ['startCustomerComment, startManagerComment'],
  watch: {
    'startCustomerComment' (v) {
      this.customerComment = Object.assign(v)
    },
    'startManagerComment' (v) {
      this.managerComment = Object.assign(v)
    }
  }
}
</script>

<style scoped>

</style>
