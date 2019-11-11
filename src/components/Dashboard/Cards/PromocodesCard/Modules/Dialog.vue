<template lang="pug">
  q-dialog(v-model="dialogState" persistent)
    q-card(style="min-width: 700px")
      q-card-section
        .row.items-center.q-py-md
          span.text-bold(
            style="line-height: 24px; font-size: 18px"
          ) Промокод № {{ newPromocode.id }}
          q-space
          q-btn(
            icon="close"
            flat
            round
            dense
            v-close-popup
          )
        .row.q-pb-md
          span.text-caption Название промокода
        .row.q-pb-md
          q-input.text-body2(
            outlined
            dense
            v-model="newPromocode.alias"
            style="width: 100%"
          )
        .row.col-12.q-pb-md.q-col-gutter-md
          .col-6
            span.row.text-caption.q-pb-md Локация
            q-select.text-body2(
              outlined
              dense
              v-model="newStudio"
              :options="$app.studios.forOptions"
              style="width: 100%"
            )
          .col-6
            span.row.text-caption.q-pb-md Зал
            q-select.text-body2(
              outlined
              dense
              v-model="newPromocode.rooms"
              :options="allRooms"
              style="width: 100%"
            )
        .row.col-12.q-pb-md.q-col-gutter-md
          .col-6
            span.row.text-caption.q-pb-md Скидка
            q-input.text-body2(
              outlined
              dense
              v-model="newPromocode.discount"
              style="width: 100%"
            )
          .col-6
            span.row.text-caption.q-pb-md Тип
            q-select.text-body2(
              outlined
              dense
              v-model="newPromocode.type"
              :options="allTypes"
              style="width: 100%"
            )
        .row.col-12.q-pb-md.q-col-gutter-md
          .col-6
            span.row.text-caption.q-pb-md Минимальная сумма заказа, р.
            q-input.text-body2(
              outlined
              dense
              v-model="newPromocode.minPrice"
              style="width: 100%"
            )
          .col-6
            span.row.text-caption.q-pb-md Статус
            q-select.text-body2(
              outlined
              dense
              v-model="newPromocode.isPublic"
              :options="allStatuses"
              style="width: 100%"
            )
        .row.col-12.q-pb-md.q-col-gutter-md
          .col-6
            span.row.text-caption.q-pb-md Период действия
            q-select.text-body2(
              outlined
              dense
              v-model="newPromocode.startedAt"
              style="width: 100%"
            )
          .col-6
            span.row.text-caption.q-pb-md Период действия
            q-select.text-body2(
              outlined
              dense
              v-model="newPromocode.dateFrom"
              style="width: 100%"
            )
        .row
          span.text-caption Заполните только дату начала, если срок действия должен быть неограничен.
      q-card-actions
        .row.col-12.justify-between.items-center
          .col-6.q-px-sm
            q-btn.fit(
              no-caps
              label="Отменить"
              v-close-popup
            )
          .col-6.q-px-sm
            q-btn.fit(
              no-caps
              color="primary"
              label="Добавить"
            ) {{ dialogStateComp }}
</template>

<script>
export default {
  name: 'PromoDialog',
  data () {
    return {
      allTypes: [
        {
          value: 'percent',
          label: 'В процентах'
        },
        {
          value: 'rub',
          label: 'В рублях'
        },
      ],
      allStatuses: [
        {
          value: 0,
          label: 'Персональный'
        },
        {
          value: 1,
          label: 'Публичный'
        },
      ],
      dialogState: this.isPromoDialog,
      fieldPromocode: this.promocode,
      newStudio: null,
      dateFrom: '',
      dateTo: '',
      startedAt: '',
      expiredAt: '',
      rooms: []
    }
  },
  props: {
    isPromoDialog: Boolean,
    studio: Number,
    promocode: Object
  },
  computed: {
    firstStudio () {
      if (!this.$app.studios.firstStudio || !this.$app.studios.firstStudio.id) return 0
      return this.$app.studios.firstStudio.id
    },
    dialogStateComp () {
      return this.dialogStateChange()
    },
    allRooms () {
      const studio = (!this.newStudio || this.newStudio.value === 0) ? this.firstStudio : this.newStudio.value
      if (studio === 0) return []
      console.log(this.$app.rooms.getAvailable({ studio: studio }))
      const rooms = this.$app.rooms.getAvailable({ studio: studio })
      if (!rooms) return []
      return rooms.map(({ id, name }) => {
        return {
          value: id,
          label: name
        }
      })
    },
    newPromocode: {
      get () {
        return this.fieldPromocode
      },
      set () {
        this.fieldPromocode = Object.assign({}, {
          ...this.fieldPromocode,
          datefrom: this.dateFrom,
          dateTo: this.dateTo,
          startedAt: this.startedAt,
          expiredAt: this.expiredAt,
          rooms: this.rooms,
        })
      }
    }
  },
  methods: {
    dialogStateChange () {
      this.$emit('dialogStateChange', this.dialogState)
    },
    typeLabelByValue (value) {
      let label = 'Неизвестный тип'
      if (value === 'percent') label = 'В процентах'
      if (value === 'rub') label = 'В рублях'
      return {
        value,
        label
      }
    },
    isPublicLabelByValue (value) {
      let label = 'Неизвестный тип'
      if (value === 0) label = 'Персональный'
      if (value === 1) label = 'Публичный'
      return {
        value,
        label
      }
    }
  },
  watch: {
    isPromoDialog (v) {
      this.dialogState = v
    },
    studio: {
      handler (v) {
        console.log(v)
        this.newStudio = Object.assign({}, { value: v })
      },
      immediate: true
    },
    promocode: {
      handler (v) {
        console.log(v)
        this.fieldPromocode = Object.assign({}, {
          alias: v.alias,
          discount: v.discount,
          type: this.typeLabelByValue(v.type),
          minPrice: v.minPrice,
          isPublic: this.isPublicLabelByValue(v.isPublic)
        })
        this.dateFrom = v.dateFrom
        this.dateTo = v.dateTo
        this.startedAt = v.startedAt
        this.expiredAt = v.expiredAt
        this.rooms = v.rooms
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
