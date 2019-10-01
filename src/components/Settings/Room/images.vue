<template lang="pug">
  .images
    h6.q-mb-md Изображения
    .row.q-pb-sm
      q-btn.q-btn--no-uppercase(label="Выбрать файл" outline dense)
    .row.no-wrap.q-pb-lg
      q-img.col.q-mr-md(src="http://placeimg.com/640/480/tech")
        q-btn.absolute-top-right(icon="close" class="block" dense flat color="white")
      q-img.col.q-mr-md(src="http://placeimg.com/640/480/animals")
        q-btn.absolute-top-right(icon="close" class="block" dense flat color="white")
      q-img.col.q-mr-md(src="http://placeimg.com/640/480/nature")
        q-btn.absolute-top-right(icon="close" class="block" dense flat color="white")
      q-img.col(src="http://placeimg.com/640/480/arch")
        q-btn.absolute-top-right(icon="close" class="block" dense flat color="white")
    .row.q-pb-lg
      .col
        q-select(:value="var" label="Показать все 30 изображений" dense)
</template>

<script>
export default {
  name: 'images',
  data: () => ({
    img1: true,
    img2: true,
    img3: true,
    img4: true,
    img5: true,
    var: ''
  })
}
</script>

<style scoped>

</style>
