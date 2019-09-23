<template lang="pug">
  q-card.column.q-py-md
    profit-card.q-pa-sm

</template>

<script>
import ProfitCard from './Cards/ProfitCard'

export default {
  name: 'Dashboard',
  components: { ProfitCard }
}
</script>

<style scoped>
</style>
