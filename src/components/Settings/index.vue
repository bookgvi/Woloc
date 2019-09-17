<template lang="pug">
  .wrapper
    q-separator
    .row.items-between.q-py-sm.q-gutter-x-sm
      q-btn.col-3.q-btn--no-uppercase.q-px-none(label="Kap's Studios м. Бауманская" outlined dense flat)
      q-space
      q-btn.col-2.q-btn--no-uppercase(label="Добавить локацию" dense color="primary")
    q-separator
    .row.justify-center
      .col-6
        datas
        specifications
        images
        addressBlock
</template>

<script>
import datas from './datas'
import specifications from './specifications'
import images from './images'
import addressBlock from './address'
export default {
  components: {
    datas,
    specifications,
    images,
    addressBlock
  }
}
</script>
