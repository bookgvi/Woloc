<template lang="pug">
  .rooms
    .row
      .col
        q-btn.q-py-none.q-px-sm(
          :label="buttonTitle"
          @click="openFilter = true"
          dense
          no-caps
          flat
          style="border: 1px solid black;"
        )
        q-popup-proxy
          .row
            .col.q-pa-md
              .checkbox(v-for="(item, index) in models" :key="index")
                input.q-mr-md.cursor-pointer(
                  :id="`room${index}`"
                  type="checkbox"
                  v-model="!currentRoom[item.name]"
                )
                label.cursor-pointer(:for="`room${index}`") {{ item.name }}
          //.text-subtitle1.text-bold.q-pt-md.q-px-lg {{ title }}
</template>

<script>

export default {
  name: 'rooms-filter',
  props: {
    values: {
      type: Object,
    },
    onChange: Function
  },
  data () {
    return {
      currentRoom: {}
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
    }
  }
}
</script>

<style scoped>
  input[type=checkbox] {
    display: none;
  }
  .checkbox label:before {
    border-radius: 3px;
  }
  input[type=checkbox]:checked + label:before {
    content: "\2713";
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
    font-size: 25px;
    color: #000;
    text-align: center;
    line-height: 25px;
  }
</style>
