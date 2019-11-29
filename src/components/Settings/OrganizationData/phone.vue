<template lang="pug">
  .phoneComponent
    .row.q-pb-sm(v-for="(item, index) in arrayLength + additionalTel" :key="index")
      .col
        q-input(
          ref="tel"
          v-model="organization.phone[index]"
          type="tel"
          mask=" +# (###) ### - ####"
          unmasked-value
          hint="Mask: +7 (###) ### - ####"
          outlined
          dense
        )
          template(#after)
            q-icon.cursor-pointer(name="delete" @click="deletePhone(index)" title="Удалить телефон")
    .phoneBtn.col
      q-btn.q-mt-sm.phoneBtn.bg-primary.text-white(label="Добавить телефон" @click="addPhone" outlined style="width: 100%;")
</template>

<script>
export default {
  name: 'phone',
  props: {
    organization: Object
  },
  data () {
    return {
      arrayLength: 0,
      additionalTel: 0
    }
  },
  watch: {
    'organization.phone.length' () {
      this.arrayLength = this.organization.phone.length
    }
  },
  created () {
    this.arrayLength = this.organization.phone.length
  },
  methods: {
    addPhone () {
      this.additionalTel++
    },
    deletePhone (index) {
      this.organization.phone.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
