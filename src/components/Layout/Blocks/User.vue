<template lang="pug">
  .user.flex.justify-end
      .username username
      img.img.round(src="../../../statics/icons/icon-128x128.png")
</template>

<script>
export default {
  name: 'User'
}
</script>

<style scoped lang="stylus">
  .round
    border 0 $tertiary solid
    border-radius 30px
  .user
    width 150px
    padding-right 20px
  .img
    width 30px
    color black
  .username
    margin auto
    margin-right 20px
    color $text-gray
    font-size 14px
    font-family Montserrat
    font-weight 500
    letter-spacing -0.3px
    line-height 18px
    text-align right
</style>
