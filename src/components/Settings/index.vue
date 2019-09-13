<template lang="pug">
  .wrapper
    .row.items-center.q-py-sm.q-gutter-x-sm
      q-input(label="test" outlined dense)
    .row.justify-center
      .col-6
        datas
        specifications
</template>

<script>
import datas from './datas'
import specifications from './specifications'
export default {
  components: {
    datas,
    specifications
  }
}
</script>
