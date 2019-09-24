<template lang="pug">
  q-card-section
    q-list
      q-item
        q-item-section.text-bold
          span {{ "Зал" }}
        q-item-section(side).text-bold
          span {{ "% р." }}
      q-item
        q-item-section(avatar)
          q-icon(color="blue" name="far fa-circle")
        q-item-section
          span {{ "Зал 12" }}
        q-item-section
          span {{ 46 }}
        q-item-section(side)
          span {{ 4600 }}
      q-item
        q-item-section(avatar)
          q-icon(color="green" name="far fa-circle")
        q-item-section
          span {{ "Зал 11" }}
        q-item-section
          span {{ 18 }}
        q-item-section(side)
          span {{ 1800 }}
      q-item
        q-item-section(avatar)
          q-icon(color="black" name="far fa-circle")
        q-item-section
          span {{ "Зал 13" }}
        q-item-section
          span {{ 26 }}
        q-item-section(side)
          span {{ 2600 }}
      q-item
        q-item-section(avatar)
          q-icon(color="red" name="far fa-circle")
        q-item-section
          span {{ "Зал 14" }}
        q-item-section
          span {{ 6 }}
        q-item-section(side)
          span {{ 600 }}
      q-item
        q-item-section(avatar)
          q-icon(color="orange" name="far fa-circle")
        q-item-section
          span {{ "Зал 15" }}
        q-item-section
          span {{ 4 }}
        q-item-section(side)
          span {{ 400 }}

</template>

<script>
export default {
  name: 'ProfitOptions',
  data () {
    return {
      checkedOptions: []
    }
  },
  computed: {
  }
}
</script>

<style scoped>

</style>
