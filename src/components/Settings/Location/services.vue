<template lang="pug">
  .datas(vi-f="this.datas.services")
    h6.q-mb-md Удобства и услуги
    .col.q-pl-md
      .row.q-pb-md(v-for="(item, index) in services" :key="index")
        q-checkbox(
          v-model="item.alias"
          :label="item.name"
          dense
        )
</template>

<script>
export default {
  props: {
    services: Array
  }
}
</script>
