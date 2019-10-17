<template lang="pug">
  .datas
    h6.q-mb-md Данные локации
    .row.q-pb-lg
      .col
        span Название &nbsp
        span.text-red *
        q-input.q-pt-sm(v-model="singleStudio.name" outlined dense)
    .row.q-pb-lg
      .col.q-pr-sm
        span Телефон &nbsp
        span.text-red *
        q-input.q-pt-sm(
          :value="singleStudio.phone | phoneNumber"
          @change.native="hInput"
          type="tel"
          outlined
          dense
        )
      .col
        span Эл. почта &nbsp
        span.text-red *
        q-input.q-pt-sm(v-model="singleStudio.email" type="email" outlined dense)
    .row.q-pb-sm
      q-checkbox(v-model="singleStudio.hidden" label="Скрыть локацию" dense)
    .row
      p В этом случае локация не будет публиковаться в общих списках, не будет выдаваться в каталоге, но будет доступна по прямой ссылке.
</template>

<script>
export default {
  name: 'datas',
  props: {
    singleStudio: Object
  },
  filters: {
    phoneNumber (value) {
      console.log(value[0])
      if (value[0] === '+') {
        this.reformatPhone(value)
      }
      // const reg = '\/s/d\'
      let phone = value
      if (phone && phone[0] !== '+') {
        phone = phone.split('')
        phone.unshift('+')
        phone.splice(2, 0, ' (')
        phone.splice(6, 0, ') ')
        phone.splice(10, 0, ' ')
        phone = phone.join('')
      }
      return phone
    }
  },
  methods: {
    hInput (e) {
      console.log(e.target.value)
      let value = e.target.value
      // value = this.reformatPhone(value)
      this.singleStudio.phone = value
    },
    reformatPhone (phone) {
      return String(phone.split('').filter(item => !isNaN(item) && item !== ' ').join(''))
    }
  }
}
</script>
