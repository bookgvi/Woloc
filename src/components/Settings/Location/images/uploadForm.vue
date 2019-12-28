<template lang="pug">
  .uploadFile.q-pa-lg
    .text-h5.q-pb-md Выберите изображение
    form(@submit.prevent="submit" class="form")
      .row.q-pb-md
        .col
          q-input(
            type="file"
            @change="onAttachmentChange"
          )
      .row
        .col.q-pr-md
          q-btn.bg-primary.text-white(type="submit" label="Отправить" style="width: 100%")
        .col
          q-btn(label="Закрыть" @click="$emit('closeUploadDialogWithoutReload')" no-caps style="width: 100%")
</template>

<script>
import { showNotif } from '../../../../utils/helpers'

export default {
  props: {
    singleStudio: Object
  },
  data () {
    return {
      submitting: false,
      name: null,
      attachment: null
    }
  },
  methods: {
    async submit () {
      this.submitting = true
      const config = { 'content-type': 'multipart/form-data' }
      const formData = new FormData()
      formData.append('sort', this.singleStudio.images.length)
      formData.append('studio', this.singleStudio.id)
      formData.append('image', this.attachment)

      const result = await this.$app.studios.uploadImage(formData, config)
      if (result.hasOwnProperty('data')) {
        this.submitting = false
        this.$emit('closeUploadDialog')
        showNotif('Изображение успешно добавлено', 'green')
      } else if (result.hasOwnProperty('errors')) {
        showNotif('Возникла ошибка. Попробуйте ещё раз или выберите другой файл', 'orange')
      } else {
        showNotif('Ошибка загрузки изображения', 'red')
      }
    },
    onAttachmentChange (e) {
      this.attachment = e.target.files[0]
    },
  }
}
</script>

<style scoped>
  .form__inputFile {
    width: 100%;
    height: 2.5em;
  }
</style>
