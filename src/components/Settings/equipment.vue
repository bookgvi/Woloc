<template lang="pug">
  .datas
    h6.q-mb-md Оборудование
      .row.q-pb-sm(v-for="(item, index) in datas.vendors" :key="index")
        .col
          q-expansion-item.text-subtitle1(:label="item.facility.name" default-opened)
            .col.q-pl-md
              .row.q-pb-md
                q-checkbox(v-model="item.id" :label="item.name")
          q-separator
</template>

<script>
export default {
  name: 'datas',
  props: {
    datas: Object
  }
}
</script>
