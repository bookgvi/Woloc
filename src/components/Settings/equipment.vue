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
                q-option-group(v-model="group" :options="monoblocks" type="checkbox")
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
    group: ['isBowens', 'isBroncolor', 'isEinstein', 'isHensel'],
    monoblocks: [
      {
        label: 'Bowens',
        value: 'isBowens'
      },
      {
        label: 'Broncolor',
        value: 'isBroncolor'
      },
      {
        label: 'Einstein',
        value: 'isEinstein'
      },
      {
        label: 'Hensel',
        value: 'isHensel'
      },
      {
        label: 'Elinchrom',
        value: 'isElinchrom'
      },
      {
        label: 'Profoto',
        value: 'isProfoto'
      }
    ]
  })
}
</script>
