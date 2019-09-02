<template lang="pug">
  .q-py-md
    .col-12.row.justify-left.items-center
      q-list
        q-item(
          v-for="(member, index) in members"
          :key="index"
        )
          .text.text_small {{ member }}
    .col-11.row.justify-left.items-center
      q-input(
        v-model="newMember"
      )
    .col-1.row.justify-left.items-center
      q-btn.q-mt-sm(
        @click="addNewMember"
        color="#B5B5B5"
        text-color="$primary"
        icon="add"
        dense
      ) {{ membersComp }}
</template>

<script>
export default {
  name: 'CalendarMembers',
  data () {
    return {
      members: [],
      newMember: ''
    }
  },
  computed: {
    membersComp () {
      return this.membersChange()
    }
  },
  methods: {
    addNewMember () {
      this.members.push(this.newMember)
      this.newMember = ''
    },
    membersChange () {
      this.$emit('membersChange', this.members)
    }
  }
}
</script>

<style scoped>

</style>
