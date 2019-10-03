<template lang="pug">
  .col-12.flex.justify-left.items-center
    q-option-group.text-body2(
      v-model="checkedExtras"
      :options="options"
      color="green"
      type="checkbox"
    ) {{ extrasComp }}
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
      return this.$app.extras.list.map(({ name }) => ({
        label: name,
        value: name,
      }))
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
    }
  },
/*  watch: {
    startExtras: {
      handler (v) {
        console.log(this.checkedExtras)
        this.checkedExtras = Object.assign(this.checkedExtras, v)
      },
      immediate: true
    }
  } */
}
</script>

<style scoped>

</style>
