<template lang="pug">
  .datas
    h6.q-mb-md Удобства и услуги
    .col.q-pl-md
      .row.q-pb-md
        q-option-group(v-model="group" :options="services" type="checkbox")
</template>

<script>
export default {
  name: 'datas',
  props: {
    datas: Object
  },
  data: () => ({
    group: ['isDressing', 'isWifi', 'isShower', 'isSnack', 'isLeasing'],
    services: [
      {
        label: 'Отдельная гримерная',
        value: 'isDressing'
      },
      {
        label: 'Wi-Fi',
        value: 'isWifi'
      },
      {
        label: 'Душ',
        value: 'isShower'
      },
      {
        label: 'Снэк-автомат',
        value: 'isSnack'
      },
      {
        label: 'Организация мероприятий',
        value: 'isParty'
      },
      {
        label: 'Прокат оборудования',
        value: 'isLeasing'
      },
      {
        label: 'Бесплатная парковка',
        value: 'isParking'
      }
    ]
  })
}
</script>
