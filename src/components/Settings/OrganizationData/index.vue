<template lang="pug">
  .organization
    .row.justify-center
      .col-6
        .row.q-py-lg
          .text-h5 Данные организации
        .row.q-pb-xs
          .col.q-pr-sm
            span Название&nbsp;
            span.text-red *
          .col.q-pr-sm
            span Тип&nbsp;
            span.text-red *
        .row.q-pb-md
          .col.q-pr-sm
            q-input(v-model="organization.name" :rules="[val => !!val || 'Обязательно для заполнения']" outlined dense)
          .col.q-pr-sm
            q-select(v-model="organization.legalType" :rules="[val => !!val || 'Обязательно для заполнения']" :options="organization.types" outlined dense)
        .row.q-pb-xs
          .col.q-pr-sm
            span Телефон
        .row.q-pb-md
          .phone.col.q-pr-sm
            q-input(v-model="organization.phone" type="tel" outlined dense)
          .phoneBtn.col
            q-btn.phoneBtn(label="Добавить телефон" @click="addPhone" outlined style="width: 100%;")
        .row.q-pb-xs
          .col.q-pr-sm
            span Фактический адрес
        .row.q-pb-md
          .col.q-pr-sm
            q-input(v-model="organization.address" outlined dense)
        .row.q-pb-xs
          q-checkbox(v-model="organization.isRealAddress" label="Юридический адрес совпадает с фактическим.")
        .realAddress(v-if="!organization.isRealAddress")
          .row.q-pb-xs
            .col.q-pr-sm
              span Фактический адрес
          .row.q-pb-md
            .col.q-pr-sm
              q-input(v-model="organization.legalAddress" outlined dense)
        .row.q-pb-xs
          .col.q-pr-sm
            span Ген. директор
          .col.q-pr-sm
            span Бухгалтер
        .row.q-pb-md
          .col.q-pr-sm
            q-input(v-model="organization.ceo" outlined dense)
          .col.q-pr-sm
            q-input(v-model="organization.accountant" outlined dense)
        .row.q-pb-xs
          .col.q-pr-sm
            span ОГРН
          .col.q-pr-sm
            span ИНН
        .row.q-pb-md
          .col.q-pr-sm
            q-input(v-model="organization.ogrn" outlined dense)
          .col.q-pr-sm
            q-input(v-model="organization.inn" outlined dense)
        .row.q-pb-xs
          .col.q-pr-sm
            span КПП
        .row.q-pb-md
          .col-6.q-pr-sm
            q-input(v-model="organization.kpp" outlined dense)
        .row.q-py-lg
          .text-h5 Банковские реквизиты
        .row.q-pb-xs
          .col.q-pr-sm
            span БИК
          .col.q-pr-sm
            span Кор. счет
        .row.q-pb-md
          .col.q-pr-sm
            q-input(v-model="organization.bic" outlined dense)
          .col.q-pr-sm
            q-input(v-model="organization.corr" outlined dense)
        .row.q-pb-xs
          .col.q-pr-sm
            span Банк
          .col.q-pr-sm
            span Рассчетный счет
        .row.q-pb-md
          .col.q-pr-sm
            q-input(v-model="organization.bank" outlined dense)
          .col.q-pr-sm
            q-input(v-model="organization.account" outlined dense)
        // TODO - возможно понадобится добавление сотрудника!!!
        //.row.q-py-lg
          .text-h5 Сотрудники
        //.row.q-pb-md
          .col
            q-list(border separator style="width: 100%;")
              q-item(clickable v-for="item in employees" :key="item.id" @click="hasModal(item)").items-center
                q-item-label.col-3.q-mr-sm {{ item.id }}. {{ item.name }}
                q-item-label.col-8.q-mr-sm
                  .inline-block(v-for="(role, index) in item.role" :key="index")
                    q-chip.bg-primary(v-if="role.isRole" square) {{ role.name }}
                q-item-label.col-1.q-ml-sm
                  q-icon(name="edit" style="font-size: 20px;")
        .row.q-py-lg
          .col.q-pr-sm
            q-btn.bg-primary.text-white(label="Сохранить" no-caps style="width: 100%;" @click="saveChanges")
          //.col
            q-btn(label="Добавить сотрудника" no-caps style="width: 100%;")
      //q-dialog(v-model="isModal")
        q-card(style="min-width: 480px;")
          employees(
           // :employees="employerProps"
           // :phone="phone"
            @closeModal="isModal = false"
          )
</template>

<script>
import employees from './employees'
import organizationSettings from '../../../api/organizationSettings'
export default {
  name: 'rules',
  components: { employees },
  data () {
    return {
      organization: {},
      isModal: false,
    }
  },
  methods: {
    async getData () {
      const { data } = await organizationSettings.getOne()
      if (!data.name) return
      return data
    },
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
    },
    hasModal (value) {
      this.isModal = true
      this.employerProps = value
    },
    async saveChanges () {
      await organizationSettings.updateOne(this.organization.id, this.organization)
      this.organization = await this.getData()
    }
  },
  async mounted () {
    this.organization = await this.getData()
  }
}
</script>

<style scoped>

</style>
