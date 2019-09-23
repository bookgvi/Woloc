<template lang="pug">
  .row.justify-start.q-px-none.q-gutter-sm
    q-btn.q-px-sm(
      label="Неделя"
      no-caps
      outline
      color="secondary"
    )
    q-btn(
      outline
      label="Месяц"
      no-caps
      color="secondary"
    )
    q-btn(
      outline
      label="Год"
      no-caps
      color="secondary"
    )
    q-space
    q-btn-group(outline)
    q-btn.q-px-sm.q-mx-none(
      outline
      icon="chevron_left"
      color="secondary"
    )
    q-btn.q-px-sm.q-mx-none(
      outline
      icon="chevron_right"
      color="secondary"
    )
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>

</style>
