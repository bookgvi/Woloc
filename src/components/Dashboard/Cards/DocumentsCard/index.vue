<template lang="pug">
  .q-pa-none
    q-card(style="max-width: 400px")
      name-slot(name="Документы")
      q-card-section.q-pa-none.q-pb-md
        q-markup-table(
          wrap-cells
          separator="none"
          style="min-width: 370px"
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
              td.text-right
                a.text-grey(
                  :href="item.link"
                  class="cursor-pointer"
                ) Скачать

</template>

<script>

import NavBar from '../CommonModules/NavBar'
import NameSlot from '../CommonModules/NameSlot'

export default {
  name: 'DocumentsCard',
  components: { NameSlot, NavBar },
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
