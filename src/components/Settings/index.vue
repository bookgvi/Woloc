<template lang="pug">
  .wrapper
    .row.items-center.q-py-sm.q-gutter-x-sm
      q-input(label="test" outlined dense)
    .row.justify-center
      .col-6
        datas
</template>

<script>
import datas from './datas'
export default {
  components: { datas }
}
</script>
