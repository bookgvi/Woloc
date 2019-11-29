<template lang="pug">
  .phoneComponent
    .row.q-pb-sm(v-for="(item, index) in arrayLength" :key="index")
      .col
        q-input(
          ref="tel"
          v-model="organization.phone[index]"
          type="tel"
          mask=" +# (###) ### - ####"
          unmasked-value
          hint="Mask: +7 (###) ### - ####"
          :rules="[val => val.length === 11 || 'Номер должен содержать 11 цифр']"
          outlined
          dense
        )
          template(#after)
            q-icon.cursor-pointer(name="delete" @click="deletePhone(index)" title="Удалить телефон")
    .phoneBtn.col
      q-btn.q-mt-sm.bg-primary.text-white(label="Добавить телефон" @click="addPhone" outlined style="width: 100%;")
</template>

<script>
export default {
  name: 'phone',
  props: {
    organization: Object
  },
  data () {
    return {
      arrayLength: 0
    }
  },
  watch: {
    'organization.phone.length' (newValue) {
      this.arrayLength = this.organization.phone.length
    }
  },
  created () {
    if (!this.organization.hasOwnProperty('phone')) return
    this.arrayLength = this.organization.phone.length
  },
  methods: {
    addPhone () {
      this.arrayLength++
    },
    deletePhone (index) {
      const result = this.organization.phone.splice(index, 1)
      if (!result.length) this.arrayLength--
    }
  }
}
</script>

<style scoped>

</style>
