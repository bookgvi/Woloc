<template lang="pug">
  q-btn(
    size="md"
    outline
    no-caps
    color="black"
    :label="studioLabel"
    dense
  )
    q-popup-proxy(
    )
      q-option-group.text-body2.q-pa-md(
        v-model="studio"
        :options="studios"
        color="green"
      )
</template>

<script>

export default {
  name: 'StudioButton',
  data () {
    return {
      checkedRooms: [],
      studio: this.$app.studios.studio
    }
  },
  computed: {
    studioLabel () {
      if (this.$app.studios.list.length !== 0) {
        return this.$app.studios.list.find(item => item.id === this.studio).name
      } else {
        return 'Студия'
      }
    },
    studios () {
      if (this.$app.studios.list.length === 0) return []
      const arr = this.$app.studios.list.map((item) => {
        const room = Object.assign({}, {
          value: item.id,
          label: item.name,
        })
        return room
      })
      return arr
    }
  },
  methods: {

  },
  watch: {
    'studio' (v) {
      this.$app.studios.studio = v
    }
  }
}
</script>

<style scoped>

</style>
