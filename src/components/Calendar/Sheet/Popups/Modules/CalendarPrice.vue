<template lang="pug">
  .q-py-md
    .col-12.row.justify-around.items-center(
      v-for="(position, index) in positions"
      :key="index"
    )
      template
        .col-9.row.justify-left.items-center
          .text.text_small {{ position.label }}
        .col-3.row.justify-left.items-center
          .text.text_gray {{ position.price }}
        q-separator(
          dark
        )
    .col-12.row.justify-left.items-center
      .text Скидка/надбавка, р.
      .row
        .col-3
          q-btn.q-mt-sm(
            @click="changeSign"
            color="#FFFFFF"
            text-color="black"
            label="+/-"
          )
        .col-9
          q-input(
            square
            filled
            v-model="discount"
          ) {{ priceComp }}
</template>

<script>
export default {
  name: 'CalendarPrice',
  data () {
    return {
      positions: [],
      discount: 0
    }
  },
  created: async function () {
    console.log(this.fee)
    const events = this.extras.map((item) => {
      const position = {
        value: item.alias,
        label: item.alias,
        price: item.price
      }
      return position
    })
    console.log(events)
    const extras = this.fee
    this.positions = events.concat(extras)
  },
  computed: {
    priceComp () {
      return this.priceChange()
    },
    price () {
      let sum = 0
      this.positions.forEach((position) => {
        sum += +position.price
      })
      return sum
    }
  },
  methods: {
    priceChange () {
      this.$emit('priceChange', this.price)
    },
    changeSign () {
      this.discount = -this.discount
    },
  },
  props: ['extras', 'fee']
}
</script>

<style scoped>

</style>
