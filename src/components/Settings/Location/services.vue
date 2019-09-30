<template lang="pug">
  .datas(vi-f="this.datas.services")
    h6.q-mb-md Удобства и услуги
    .col.q-pl-md
      .row.q-pb-md(v-for="(item, index) in singleStudio.services" :key="index")
        q-checkbox(
          v-model="singleStudio.services[index].alias"
          :label="singleStudio.services[index].name"
          dense
          )
</template>

<script>
export default {
  props: {
    singleStudio: Object
  },
  data () {
    return {
      groupTmp: this.singleStudio.services
    }
  }
}
</script>
