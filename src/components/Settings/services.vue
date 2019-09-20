<template lang="pug">
  .datas
    h6.q-mb-md Удобства и услуги
    .col.q-pl-md
      .row.q-pb-md
        q-checkbox(v-model="isDressing" label="Отдельная гримерная" dense)
      .row.q-pb-md
        q-checkbox(v-model="isWifi" label="Wi-Fi" dense)
      .row.q-pb-md
        q-checkbox(v-model="isShower" label="Душ" dense)
      .row.q-pb-md
        q-checkbox(v-model="isSnack" label="Снэк-автомат" dense)
      .row.q-pb-md
        q-checkbox(v-model="isParty" label="Организация мероприятий" dense)
      .row.q-pb-md
        q-checkbox(v-model="isLeasing" label="Прокат оборудования" dense)
      .row.q-pb-md
        q-checkbox(v-model="isParking" label="Бесплатная парковка" dense)
</template>

<script>
export default {
  name: 'datas',
  data: () => ({
    isDressing: true,
    isWifi: true,
    isShower: true,
    isSnack: true,
    isParty: false,
    isLeasing: true,
    isParking: false,
  })
}
</script>
