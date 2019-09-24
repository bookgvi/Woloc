<template lang="pug">
  q-card-section.row
    q-btn.q-mr-md(
      label="Студия"
      size="xs"
      no-caps
      outline
      color="secondary"
    )
    q-btn.q-mr-xs(
      label="Неделя"
      size="xs"
      no-caps
      outline
      color="secondary"
    )
    q-btn.q-mr-xs(
      outline
      label="Месяц"
      size="xs"
      no-caps
      color="secondary"
    )
    q-btn.q-mr-xs(
      outline
      size="xs"
      label="Квартал"
      no-caps
      color="secondary"
    )
    q-space
    q-btn-group(outline)
      q-btn.q-px-sm.q-mx-none(
        size="xs"
        outline
        icon="chevron_left"
        color="secondary"
      )
      q-separator(vertical, inset)
      q-btn.q-px-sm.q-mx-none(
        size="xs"
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
