<template lang="pug">
  q-separator.absolute(
    color="red"
    style="left: 0px; width: 100%; z-index: 1"
    :style="top"
  )
</template>

<script>
export default {
  name: 'Timeline',
  data () {
    return {
      interval: {},
      now: this.$moment()
    }
  },
  mounted () {
    setInterval(() => {
      this.now = this.$moment()
    }, 1000 * 60)
  },
  computed: {
    top () {
      const hours = this.$moment(this.now).format('HH')
      const minutes = this.$moment(this.now).format('mm')
      const position = this.timeStartPos(hours) + +this.timeDurationHeight(1) * minutes
      const top = (hours >= 8) ? `${position}px` : '0px'
      return {
        top
      }
    },
  },
  props: ['timeStartPos', 'timeDurationHeight']
}
</script>

<style scoped>

</style>
