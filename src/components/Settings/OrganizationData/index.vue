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
        .row.q-pb-xs
          .col.q-pr-sm
            span Ген. директор
          .col.q-pr-sm
            span Бухгалтер
        .row.q-pb-md
          .col.q-pr-sm
            q-input(v-model="ceo" outlined dense)
          .col.q-pr-sm
            q-input(v-model="booker" outlined dense)
        .row.q-pb-xs
          .col.q-pr-sm
            span ОГРН
          .col.q-pr-sm
            span ИНН
        .row.q-pb-md
          .col.q-pr-sm
            q-input(v-model="ogrn" outlined dense)
          .col.q-pr-sm
            q-input(v-model="inn" outlined dense)
        .row.q-pb-xs
          .col.q-pr-sm
            span КПП
        .row.q-pb-md
          .col-6.q-pr-sm
            q-input(v-model="kpp" outlined dense)
        .row.q-py-lg
          .text-h5 Данные организации
        .row.q-pb-xs
          .col.q-pr-sm
            span БИК
          .col.q-pr-sm
            span Кор. счет
        .row.q-pb-md
          .col.q-pr-sm
            q-input(v-model="bic" outlined dense)
          .col.q-pr-sm
            q-input(v-model="corrAccount" outlined dense)
        .row.q-pb-xs
          .col.q-pr-sm
            span Банк
          .col.q-pr-sm
            span Рассчетный счет
        .row.q-pb-md
          .col.q-pr-sm
            q-input(v-model="bank" outlined dense)
          .col.q-pr-sm
            q-input(v-model="account" outlined dense)
        .row.q-py-lg
          .text-h5 Сотрудники
        .row.q-pb-md
          .col
            q-list(border separator style="width: 100%;" @click="isModal = true")
              q-item(clickable).items-center
                q-item-label.q-pr-md 1. Андрей Ревин
                q-item-label.q-pr-md
                  q-chip.bg-primary Владелец
                  q-chip.bg-primary Админ
              q-item(clickable).items-center
                q-item-label.q-pr-md 1. Андрей Ревин
                q-item-label.q-pr-md
                  q-chip.bg-primary Владелец
                  q-chip.bg-primary Админ
        q-dialog(v-model="isModal")
          q-card
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
      isRealAddress: true,
      ceo: 'Капустин Дмитрий Сергеев',
      booker: 'Капустин Дмитрий Сергеев',
      ogrn: 1087746473033,
      inn: 7726084155,
      kpp: 772601010,
      bic: '044 525 225',
      corrAccount: '301 010 101 000 000 202 00',
      bank: 'ПАО Сбербанк',
      account: '407 020 101 380 000 500 25',
      isModal: false
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
