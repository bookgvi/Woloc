<template lang="pug">
  .rooms
    h6.q-mb-md Залы
    .col
      draggable(:list="arr")
        q-list(v-for="item in arr" :key="item.id")
          q-item
            q-item-section {{ item.id }}.  {{ item.name }}
            q-icon(name="drag_handle")
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

<style scoped>
  .q-list:hover {
    border-top: 1px solid silver;
    border-bottom: 1px solid silver;
    background-color: rgba(0, 0, 0, 0.08);
  }
  .q-icon {
    font-size: 1.5em;
    cursor: pointer;
  }
</style>
