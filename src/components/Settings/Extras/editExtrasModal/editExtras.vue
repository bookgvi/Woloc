<template lang="pug">
  .editExtras
    .row.justify-center
      .col
        .text-h6 Дополнительная услуга
      q-space
      .col-1
        q-btn(icon="close" flat @click="$emit('hide')")
    .row
      span Название
    .row.q-pb-md
      .col
        q-input(v-model="dataset.title" outlined dense)
    .row
      .col.q-pr-md
        span Локация
      .col
        span Зал
    .row.q-pb-md
      .col.q-pr-md
        q-input(v-model="singleStudio.name" outlined dense disable)
      .col
        q-select(
          v-model="selectedRooms"
          :options="allRoomsOfThisStudio.map(item => item.name)"
          multiple
          outlined
          dense
        )
    .row
      span Описание
    .row.q-pb-md
      .col
        textarea.text-grey-8(v-model="dataset.description" type="textarea" cols="5" style="width: 100%;")
    .row
      span Цена, ₽
    .row.q-pb-md
      q-input(v-model="dataset.amount" outlined dense)
    .row
      q-checkbox(v-model="hasLimit" label="Включить ограничение по колличеству доп. услуг")
    .col(v-if="hasLimit")
      .row
        span Лимит
      .row
        q-input(v-model="dataset.maxLimit" outlined dense)
    .row.q-py-md
      .text-h6 Изображения
    //.row.q-pb-xs
      q-btn(outline dense label="Выбрать файл")
    .row.no-wrap.q-pb-md
      q-img(:src="dataset.image | imgUrl" style="height: 150px; max-width: 150px")
        q-btn.absolute-top-right(icon="close" class="block" dense flat color="white")
    .row.q-pb-md.justify-center
      .col-6.q-pa-sm
        q-btn.fit.bg-white.text-black(label="Удалить" no-caps)
      .col-6.q-pa-sm
        q-btn.fit.bg-primary.text-white(label="Сохранить" no-caps flat)
</template>

<script>
import FiltersList from '../../../Filters/FiltersList'
import RoomsFilter from '../../../Filters/RoomsFilter'
export default {
  name: 'modalForExtras',
  props: {
    singleStudio: Object,
    rooms: Array,
    dataset: Object,
    allRoomsOfThisStudio: Array
  },
  components: {
    FiltersList,
    RoomsFilter
  },
  data: () => ({
    isLimit: false,
    selected: []
  }),
  filters: {
    imgUrl () {
      return 'http://placeimg.com/640/480/animals'
    }
  },
  computed: {
    hasLimit: {
      get () {
        return this.isLimit
      },
      set (val) {
        this.isLimit = val
      }
    },
    selectedRooms: {
      get () {
        return this.selected
      },
      set (val) {
        this.selected = val
        this.dataset.rooms = this.selected.map(item => {
          const arrayWithOneRoom = this.allRoomsOfThisStudio.filter(item2 => item === item2.name)
          return arrayWithOneRoom.pop()
        })
      }
    }
  },
  mounted () {
    this.hasLimit = Boolean(this.dataset.maxLimit)
    this.selected = this.rooms.map(item => item.name)
  }
}
</script>

<style scoped>
</style>
