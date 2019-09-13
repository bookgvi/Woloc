<template lang="pug">
  .wrapper
    .row.items-center.q-py-sm.q-gutter-x-sm
      q-input(label="test" outlined dense)
    .row.justify-center
      .col-6
        datas
        specifications
        images
</template>

<script>
import datas from './datas'
import specifications from './specifications'
import images from './images'
export default {
  components: {
    datas,
    specifications,
    images
  }
}
</script>
