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
        services
        equipment
        rooms
        .row.q-py-lg.justify-center
          q-btn.bg-primary.text-white.q-px-xl.q-mr-sm(label="Сохранить" no-caps)
          q-btn(label="Сохранить и создать зал" no-caps)
</template>

<script>
import datas from './datas'
import specifications from './specifications'
import images from './images'
import addressBlock from './address'
import services from './services'
import equipment from './equipment'
import rooms from './rooms'
import studios from '../../api/studios'
export default {
  components: {
    datas,
    specifications,
    images,
    addressBlock,
    services,
    equipment,
    rooms,
    studios
  },
  async created () {
    const { data } = await this.$app.studios.getSingle(371)
    console.log(data)
  }
}
</script>
