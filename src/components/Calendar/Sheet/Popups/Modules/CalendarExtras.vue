<template lang="pug">
  .row.justify-left.items-center
    q-list.q-pa-md.text-body2(
      v-if="$app.extras.extrasForRoom.length > 0"
    ) {{ extrasComp }}
      q-item.q-pa-none(
        v-for="(item, index) in options"
        :key="index"
      )
        q-item-section(thumbnail)
          q-checkbox(v-model="tru" dense)
        q-item-section
          q-item-label {{ item.title }}
          q-input.q-pb-md(
            dense
            v-model.number="model"
            type="number"
          )
        q-item-section(side)
          q-item-label(caption) {{ item.amount }} р.
    span.text-body2(v-else) В этом зале нет доп. услуг
</template>

<script>

export default {
  name: 'CalendarExtras',
  data () {
    return {
      checkedExtras: [...this.startExtras],
      tru: false,
      model: 1,
    }
  },
  computed: {
    extrasComp () {
      return this.extrasChange()
    },
    options () {
      if (!this.$app.extras.extrasForRoom) return []
      return this.$app.extras.extrasForRoom
    }
  },
  methods: {
    extrasChange () {
      this.$emit('extrasChange', [...this.checkedExtras])
    }
  },
  props: {
    startExtras: {
      type: Array,
      default: _ => {
        return []
      }
    },
    roomId: {
      type: Number
    }
  },
  watch: {
    roomId: {
      async handler (v) {
        if (v === 0) return
        await this.$app.extras.getForCalendar({ room: v })
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
