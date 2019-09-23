<template lang="pug">
  .rooms
    h6.q-mb-md Залы
    .col.q-pl-md
      draggable(:list="arr" @start="drag=true" @end="drag=false")
        q-field(v-for="item in arr" :key="item.id" dense)
          template(v-slot="append")
            span.q-py-sm.text-grey-7 {{ item.id }}.  {{ item.name }}
        q-separator
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'datas',
  components: { draggable },
  data: () => ({
    arr: [
      { name: 'Зал №11', id: 1 },
      { name: 'Зал №13', id: 2 },
      { name: 'Зал №15', id: 3 },
      { name: 'Зал №12', id: 4 },
      { name: 'Зал №14', id: 5 },
    ]
  })
}
</script>

<style>
  .handle {
    float: left;
    padding-top: 8px;
    padding-bottom: 8px;
  }
</style>
