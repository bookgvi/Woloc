<template lang="pug">
  .q-pa-none
    q-card
      q-card-section.q-pb-none
        q-card.text-body2.q-mb-md(
          v-for="(item, index) in options"
          :style="{ 'background-color': item.color }"
          :key="index"
        )
          q-card-section
            .row.col-12
              .col-9
                span.text-bold {{ item.title }}
              .col
                span.text-caption {{ item.date }}
          q-card-section
            span {{ item.text }}
      q-card-actions.q-pt-none.q-pl-lg
        q-btn.text-body2.text-black(
          outline
          size="sm"
          label="Добавить заметку"
          no-caps
          @click="add"
          color="secondary"
        )
</template>

<script>

const colors = ['#B6E1FD', '#F9FAB2', '#FF9EC8', '#BAFFBF']

export default {
  name: 'NotesCard',
  data () {
    return {
      notes: [
        {
          title: 'Подготовить доп. штатив',
          text: '27 мая, к 12:00, зал 12',
          date: this.$moment().subtract(5, 'days').format('DD MMMM'),
          color: colors[0]
        },
        {
          title: 'Скидка постоянникам',
          text: 'Подарить скидку 10% постоянным клиентам с неограниченным периодом действия',
          date: this.$moment().subtract(2, 'days').format('DD MMMM'),
          color: colors[1]
        },
      ]
    }
  },
  computed: {
    options () {
      return this.notes
    }
  },
  methods: {
    add () {
      //
    }
  }
}
</script>

<style scoped>

</style>
