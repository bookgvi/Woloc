<template lang="pug">
  .phone
    .row.q-pb-sm
      .phone.col.q-pr-sm(v-for="(item, index) in organization.phone" :key="index")
        q-input(
          :value="item"
          @input
          type="tel"
          mask=" +7 (###) ### - ####"
          unmasked-value
          hint="Mask: +7 (###) ### - ####"
          outlined
          dense
        )
    .phoneBtn.col
      q-btn.phoneBtn.bg-primary.text-white(label="Добавить телефон" @click="addPhone" outlined style="width: 100%;")
</template>

<script>
export default {
  name: 'phone',
  props: {
    organization: Object
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
