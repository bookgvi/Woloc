<template lang="pug">
  .datas
    h6.q-mb-md Данные локации
    .row.q-pb-lg
      .col
        span Название
        q-input.q-pt-sm(v-model="name" outlined dense)
    .row.q-pb-lg
      .col.q-pr-sm
        span Телефон
        q-input.q-pt-sm(v-model="phone" type="tel" outlined dense)
      .col
        span Эл. почта
        q-input.q-pt-sm(v-model="mail" type="email" outlined dense)
    .row.q-pb-sm
      q-checkbox(v-model="isChecked" label="Скрыть локацию" dense)
    .row
      p В этом случае локация не будет публиковаться в общих списках, не будет выдаваться в каталоге, но будет доступна по прямой ссылке.
</template>

<script>
export default {
  name: 'datas',
  data: () => ({
    name: 'Kap\'s Studios м. Бауманская',
    phone: '+7 909 333 00 06',
    mail: 'andre@revin.ru',
    isChecked: false
  })
}
</script>
