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
        q-input.q-pt-sm(v-if="!singleStudio.phone" placeholder="+7 (800) 800 0123", outlined dense)
        q-input.q-pt-sm(
          v-if="singleStudio.phone"
          :value="reformatPhone(singleStudio.phone) | phoneNumber"
          @change.native="phoneChange"
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
    phoneChange (e) {
      const value = e.target.value
      this.$emit('phoneChange', value)
    },
    reformatPhone (phone) {
      return String(phone.split('').filter(item => !isNaN(item) && item !== ' ').join(''))
    }
  }
}
</script>
