<template lang="pug">
  .extraCharge
    q-table(
      :data="charge"
      :columns="columns"
    )
      template(#bottom)
      template(#body="props")
        q-tr
          q-td(v-for="({ __tdClass, name }, index) in columns" :key="index" :class="__tdClass")
            template(v-if="name !== 'charge'")
              u.text-primary.cursor-pointer {{ props.row[name] }}
                q-popup-edit(v-model="props.row[name]")
                  q-input(v-model="props.row[name]" dense autofocus)
            template(v-else) {{ props.row[name] }}
</template>

<script>
export default {
  name: 'extraCahrge',
  props: {
    payment: {
      type: Object,
      default: _ => {
      }
    }
  },
}
</script>

<style scoped>

</style>
