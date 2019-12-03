<template lang="pug">
  .roomFilter
    q-btn.q-py-none.q-px-sm(
      :label="buttonTitle",
      no-caps
      flat
      dense
      style="border: 1px solid black;"
    )
    q-popup-proxy(
      ref="QPopupProxy"
      transition-show="scale"
      transition-hide="scale"
    )
      .row.q-pb-md
        .col
          .text-subtitle1.text-bold.q-pt-md.q-px-lg {{ title }}
          .checkbox.q-pl-md.q-pt-md(v-for="(item, index) in models")
            input(
              :id="`checkbox${index}`"
              type="checkbox"
              v-model="selectedRooms[item.id]"
            )
            label(:for="`checkbox${index}`") {{ models[index].name }}
          .checkbox.q-pl-md.q-pt-md
            input(
              id="checkboxAll"
              type="checkbox"
              v-model="selectedAllRooms"
            )
            label(for="checkboxAll") Все залы

          .row
            q-btn-group.q-pa-md(outline)
              q-btn.q-mr-md(
                label="Отменить"
                no-caps
                :style="{ border: '#f0f0f0 solid 1px' }"
                @click="onReset"
              )
              q-btn(
                label="Применить"
                color="primary"
                no-caps
                @click="onApply"
              )
</template>

<script>
import FilterSelect from './FilterSelect'

export default {
  name: 'rooms-filter',
  components: { FilterSelect },
  props: {
    values: {
      type: Object,
    }
  },
  data () {
    return {
      selectedAll: false,
      selectedRooms: {}
    }
  },
  watch: {
    models (newVal) {
      this.selection()
    }
  },
  computed: {
    title () {
      const studio = this.$app.studios.getFiltered(this.values)

      return studio && studio.name
    },
    value () {
      return this.values.rooms || []
    },
    buttonTitle () {
      return `Залы ${this.value.length || ''}`
    },
    models () {
      return this.$app.rooms.getAvailable(this.values)
    },
    selectedAllRooms: {
      get () {
        return this.selectedAll
      },
      set (val) {
        this.models.forEach((item, index) => {
          this.selectedRooms[item.id] = val
        })
        this.selectedAll = val
      }
    }
  },
  created () {
    this.selection()
  },
  methods: {
    hidePopup () {
      this.$refs.QPopupProxy.hide()
    },
    async onApply () {
      const page = this.$route.path.split('/')[1]
      let filteredRooms = []
      for (let key in this.selectedRooms) {
        if (this.selectedRooms[key]) {
          filteredRooms.push(+key)
        }
      }
      await this.$app.filters.setValue(page, 'rooms', filteredRooms)
      this.hidePopup()
    },
    onReset () {
      this.hidePopup()
    },
    selection () {
      this.selectedRooms = Object.assign({})
      this.value.forEach(item => {
        this.selectedRooms[item] = true
      })
    },
    toggleSelectAll (selected) {
    }
  }
}
</script>
