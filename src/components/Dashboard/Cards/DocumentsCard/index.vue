<template lang="pug">
  .q-pa-none
    q-card
      q-card-section
        span.row.text-bold.text-body1.q-pt-md.q-pl-sm.q-pb-none Документы
      q-card-section.q-pt-none
        q-markup-table(
          separator="none"
          style="max-width: 400px"
          dense
          flat
        )
          thead.text-left
          tbody
            tr(
              v-for="(item, index) in options"
              :key="index"
            )
              td {{ item.name }}
              td
                a.text-grey(
                  :href="item.link"
                  class="cursor-pointer"
                ) Скачать

</template>

<script>

import NavBar from '../CommonModules/NavBar'

export default {
  name: 'DocumentsCard',
  components: { NavBar },
  async created () {
    await this.$app.documents.getAll()
  },
  data () {
    return {
    }
  },
  computed: {
    options () {
      return this.$app.documents.list
    }
  },
  methods: {
  },
}
</script>

<style scoped>

</style>
