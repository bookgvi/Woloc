<template lang="pug">
  .organization
    .row.justify-center
      .col-6
        .row.q-py-lg
          .text-h5 Данные организации
        .row.q-pb-xs
          .col.q-pr-sm
            span Название
          .col.q-pr-sm
            span Тип
        .row.q-pb-md
          .col.q-pr-sm
            q-input(v-model="name" outlined dense)
          .col.q-pr-sm
            q-select(v-model="currentType" :options="types" outlined dense)
        .row.q-pb-xs
          .col.q-pr-sm
            span Телефон
        .row.q-pb-md
          .phone.col.q-pr-sm
            q-input(v-model="phone" type="tel" outlined dense)
          .phoneBtn.col
            q-btn.phoneBtn(label="Добавить телефон" @click="addPhone" outlined style="width: 100%;")
        .row.q-pb-xs
          .col.q-pr-sm
            span Фактический адрес
        .row.q-pb-md
          .col.q-pr-sm
            q-input(v-model="address" outlined dense)
        .row.q-pb-xs
          q-checkbox(v-model="isRealAddress" label="Юридический адрес совпадает с фактическим.")
</template>

<script>
export default {
  name: 'rules',
  data () {
    return {
      name: 48,
      currentType: 'ООО',
      types: ['ООО', 'АО', 'ПАО'],
      phone: '+7 495 790 66 24',
      address: '109618, Россия, Москва, ул. Щипок, д 28',
      isRealAddress: true
    }
  },
  methods: {
    addPhone () {
      const phoneBlock = document.querySelector('.phone')
      const phoneBtnCol = document.querySelector('.phoneBtn')
      const phoneBtn = document.querySelector('.q-btn.phoneBtn')
      const input = document.createElement('input')
      const input2 = document.createElement('input')
      const newInputTel = phoneBlock.appendChild(input)
      const space = phoneBtnCol.insertBefore(input2, phoneBtn)
      newInputTel.type = 'tel'
      newInputTel.style.width = '100%'
      newInputTel.style.height = '2.5rem'
      newInputTel.classList.add('q-mt-sm')
      newInputTel.classList.add('q-pl-sm')
      space.style.height = '2.5rem'
      space.classList.add('q-mb-sm')
      space.style.border = 'none'
    }
  }
}
</script>

<style scoped>

</style>
