<template lang="pug">
  .datas
    h6.q-mb-md Данные локации
    .row.q-pb-lg
      .col
        span Название
        q-input.q-pt-sm(v-model="datas.name" outlined dense)
    .row.q-pb-lg
      .col.q-pr-sm
        span Телефон
        q-input.q-pt-sm(v-model="datas.phone" type="tel" outlined dense)
      .col
        span Эл. почта
        q-input.q-pt-sm(v-model="datas.email" type="email" outlined dense)
    .row.q-pb-sm
      q-checkbox(v-model="datas.hidden" label="Скрыть локацию" dense)
    .row
      p В этом случае локация не будет публиковаться в общих списках, не будет выдаваться в каталоге, но будет доступна по прямой ссылке.
</template>

<script>
export default {
  name: 'datas',
  props: {
    datas: Object
  }
}
</script>
