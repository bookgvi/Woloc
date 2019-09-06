<template lang="pug">
  q-page
    .wrapper
      .users
        UsersMenu
        q-separator.q-mt-xs.q-px-none.q-my-md
        UsersTable
</template>

<script>
import UsersMenu from './Menu/Index'
import UsersTable from './Table/Index'

export default {
  name: 'UsersIndex',
  components: { UsersMenu, UsersTable },
}
</script>

<style scoped>

</style>
