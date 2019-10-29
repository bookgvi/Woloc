<template lang="pug">
  .col-12.flex.justify-left.items-center
    q-option-group.text-body2(
      v-if="$app.extras.extrasForRoom.length > 0"
      v-model="checkedExtras"
      :options="options"
      color="green"
      type="checkbox"
    ) {{ extrasComp }}
    span.text-body2 В этом зале нет доп. услуг
</template>

<script>
// import sortBy from 'lodash/sortBy'

export default {
  name: 'CalendarExtras',
  data () {
    return {
      checkedExtras: [...this.startExtras]
    }
  },
  computed: {
    extrasComp () {
      return this.extrasChange()
    },
    options () {
      let arr = []
      this.$app.extras.extrasForRoom.forEach(({ title, amount }) => {
        arr.push({
          label: title,
          value: title,
          amount
        })
      })
      return arr
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
        console.log(this.$app.extras.extrasForRoom)
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
