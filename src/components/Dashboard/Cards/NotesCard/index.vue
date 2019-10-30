<template lang="pug">
  standart-card
    .q-pa-none
    name-slot(name="Заметки")
    template(v-if="!isNoteEditMode")
      q-card-section.q-pb-none
        q-card.text-body2.q-mb-md(
          v-for="(item, index) in options"
          :style="{ 'background-color': item.color }"
          :key="index"
        )
          q-card-section
            .row.col-12.justify-between
              .col-8
                span.text-bold {{ item.title }}
              .col.text-right
                span.text-caption(
                  style="cursor: pointer"
                  @click="noteEditMode(item, index)"
                  @mouseover="mouseOver"
                  @mouseleave="mouseLeave"
                ) {{ item.date }}
          q-card-section
            span {{ item.text }}
      q-card-actions.q-pt-none.q-pl-md.q-pb-md
        q-btn.text-body2.text-black(
          outline
          size="sm"
          label="Добавить заметку"
          no-caps
          @click="add"
          color="secondary"
        )
    template(v-else)
      .q-pt-md.q-pa-none
        q-card-section.q-pa-none.q-mx-md(
          :style="{ 'background-color': itemBuffer.color }"
          style="min-width: 370px"
        )
          q-input.text-body2(
            v-model="itemBuffer.title"
            placeholder="Заголовок"
            outlined
            dense
          )
          q-input.text-body2(
            v-model="itemBuffer.text"
            placeholder="Заметка"
            type="textarea"
            outlined
            dense
          )
        q-card-actions.q-px-md.q-pb-md
          .row.col-12
            .col-8.row.justify-between.items-center.q-pr-sm
              q-btn.text-body2.text-black(
                outline
                size="sm"
                label="Отменить"
                no-caps
                style="width: 70px"
                @click="isNoteEditMode = false"
                color="secondary"
              )
              q-btn.text-body2.text-black(
                outline
                size="sm"
                label="Сохранить"
                no-caps
                style="width: 70px"
                @click="save"
                color="secondary"
              )
              q-btn.text-body2.text-black(
                outline
                v-if="itemBuffer.id && itemBuffer.id > 0"
                size="sm"
                style="width: 70px"
                label="Удалить"
                no-caps
                @click="save"
                color="secondary"
              )
            .col.row.justify-between.items-center.q-pl-sm
              q-btn(
                size="sm"
                flat
                v-for="(color, index) in colors"
                style="width: 25px"
                @click="itemBuffer.color = color"
                :style="{ 'background-color': color }"
                :key="index"
              )
</template>

<script>

import StandartCard from '../CommonModules/StandartCard'
import NameSlot from '../CommonModules/NameSlot'
const colors = ['#B6E1FD', '#F9FAB2', '#FF9EC8', '#BAFFBF']

export default {
  name: 'NotesCard',
  components: { NameSlot, StandartCard },
  data () {
    return {
      isNoteEditMode: false,
      colors: [],
      targetTextBuffer: '',
      indexBuffer: -1,
      itemBuffer: {},
      notes: [
        {
          id: 1,
          title: 'Подготовить доп. штатив',
          text: '27 мая, к 12:00, зал 12',
          date: this.$moment().subtract(5, 'days').format('DD MMMM'),
          color: colors[0]
        },
        {
          id: 2,
          title: 'Скидка постоянникам',
          text: 'Подарить скидку 10% постоянным клиентам с неограниченным периодом действия',
          date: this.$moment().subtract(2, 'days').format('DD MMMM'),
          color: colors[1]
        },
      ]
    }
  },
  created () {
    this.colors = [...colors]
  },
  computed: {
    options () {
      console.log(this.$app.organizationNotes.list)
      return this.notes
    }
  },
  methods: {
    mouseOver (e) {
      this.targetTextBuffer = e.target.innerText
      e.target.innerText = 'Редактировать'
    },
    mouseLeave (e) {
      e.target.innerText = this.targetTextBuffer
      this.targetTextBuffer = ''
    },
    noteEditMode (item, index) {
      this.indexBuffer = index
      this.itemBuffer = Object.assign({}, item)
      this.isNoteEditMode = true
    },
    async save () {
      if (this.itemBuffer && this.itemBuffer.id > 0) {
        const id = this.itemBuffer.id
        const params = {
          title: this.itemBuffer.title,
          text: this.itemBuffer.text,
          color: this.itemBuffer.color
        }
        console.log(id, params)
        this.notes[this.indexBuffer] = Object.assign({}, this.itemBuffer)
      } else {
        this.notes.push(this.itemBuffer)
      }
      this.isNoteEditMode = false
      this.indexBuffer = -1
      this.itemBuffer = Object.assign({})
    },
    delete () {
      //
    },
    add () {
      this.indexBuffer = -1
      this.itemBuffer = Object.assign({
        id: 0,
        title: '',
        text: '',
        date: this.$moment().format('DD MMMM'),
        color: this.colors[0]
      })
      this.isNoteEditMode = true
    }
  },
}
</script>

<style scoped>

</style>
