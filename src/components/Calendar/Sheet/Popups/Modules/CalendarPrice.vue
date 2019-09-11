<template lang="pug">
  .q-py-none
    .col-12.row.justify-around.items-center.text-body2(
      v-for="(position, index) in positions"
      :key="index"
    )
      .col-9.row.justify-left.items-center
        .text.text_small {{ position.name }}
      .col-3.row.justify-left.items-center
        .text.text_gray {{ position.value }}
      .row.col-12.q-py-sm
        q-separator(
          inset
        )
    .col-12.row.justify-left.items-center
      .col-9.row.justify-left.items-center
        .text.text_small {{ "Итого" }}
      .col-3.row.justify-left.items-center
        .text.text_gray {{ price }}
      .row.col-12.q-py-sm
        q-separator(
          inset
        )
    .col-12.row.justify-left.items-center
      .text.q-py-sm Скидка/надбавка, р.
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
    .col-12.row.justify-left.items-center
      .row.col-12.q-py-sm
        q-separator(
          inset
        )
      .col-9.row.justify-left.items-center
        .text.text_small {{ "Цена со скидкой" }}
      .col-3.row.justify-left.items-center
        .text.text_gray {{ priceWithDiscount }}
      .row.col-12.q-pt-sm
        q-separator(
          inset
        )
</template>

<script>
export default {
  name: 'CalendarPrice',
  data () {
    return {
      discount: 0,
      event: {
        name: '',
        price: 0
      },
    }
  },
  created: async function () {
  },
  computed: {
    priceComp () {
      return this.priceChange()
    },
    price () {
      let sum = 0
      this.positions.forEach((position) => {
        sum += +position.value
      })
      return sum
    },
    priceWithDiscount () {
      return this.price + +this.discount
    },
    positions () {
      let arr = []
      arr.push(this.fee)
      arr.push(...this.extras)
      return arr
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
  props: ['extras', 'fee'],
  watch: {
    'fee' (v) {
      console.log(v)
      this.event = Object.assign({
        name: v.name,
        value: v.value
      })
    },
    'extras' (v) {
      console.log(v)
    }
  }
}
</script>

<style scoped>

</style>
