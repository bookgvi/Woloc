<template lang="pug">
  q-pa-md
    q-option-group(
      v-model="separator"
      inline
      :options= [
        { label: 'Horizontal (default)', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
        { label: 'Cell', value: 'cell' },
        { label: 'None', value: 'none' },
    ])
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>

</style>
