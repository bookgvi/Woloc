<template lang="pug">
  .datas(vi-f="this.datas.services")
    h6.q-mb-md Удобства и услуги
    .col.q-pl-md
      .row.q-pb-md(v-for="(item, index) in datas.services" :key="index")
        q-checkbox(
          v-model="datas.services[index].alias"
          :label="datas.services[index].name"
          dense
          )
</template>

<script>
export default {
  name: 'datas',
  props: {
    datas: Object
  },
  data () {
    return {
      groupTmp: this.datas.services
    }
  }
}
</script>
