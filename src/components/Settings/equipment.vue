<template lang="pug">
  .datas
    h6.q-mb-md Оборудование
    .col
      .row.q-pb-sm
        .col
          q-expansion-item.text-subtitle1(label="Генераторный свет")
      .row.q-pb-sm
        .col
          q-separator
          q-expansion-item.text-subtitle1(label="Моноблоки" default-opened)
            .col.q-pl-md
              .row.q-pb-md
                q-checkbox(v-model="isBowens" label="Bowens" dense)
              .row.q-pb-md
                q-checkbox(v-model="isBroncolor" label="Broncolor" dense)
              .row.q-pb-md
                q-checkbox(v-model="isEinstein" label="Einstein" dense)
              .row.q-pb-md
                q-checkbox(v-model="isHensel" label="Hensel" dense)
              .row.q-pb-md
                q-checkbox(v-model="isElinchrom" label="Elinchrom" dense)
              .row.q-pb-md
                q-checkbox(v-model="isProfoto" label="Profoto" dense)
      .row.q-pb-sm
        .col
          q-separator
          q-expansion-item.text-subtitle1(label="Системы крепления")
      .row.q-pb-sm
        .col
          q-separator
          q-expansion-item.text-subtitle1(label="Постоянный свет")
</template>

<script>
export default {
  name: 'datas',
  data: () => ({
    isBowens: true,
    isBroncolor: true,
    isEinstein: true,
    isHensel: true,
    isElinchrom: false,
    isProfoto: false
  })
}
</script>
