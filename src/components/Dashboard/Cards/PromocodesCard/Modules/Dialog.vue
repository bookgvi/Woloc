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
              multiple
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
              v-model="firstPeriod"
              style="width: 100%"
            )
          .col-6
            span.row.text-caption.q-pb-md Период действия
            q-select.text-body2(
              outlined
              dense
              v-model="secondPeriod"
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
    }
  },
  props: {
    isPromoDialog: Boolean,
    studio: Number,
    promocode: Object
  },
  computed: {
    firstPeriod: {
      get () {
        return this.startedAt + ' — ' + this.expiredAt
      }
    },
    secondPeriod: {
      get () {
        return this.dateFrom + ' — ' + this.dateTo
      }
    },
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
    entityLabelByValue (value, allEntities) {
      let label = 'Неизвестный тип'
      if (!allEntities) {
        return {
          value: 'Неизвестное значение',
          label
        }
      }
      for (let i = 0; i < allEntities.length; i++) {
        const item = allEntities[i]
        if (value === item.value) {
          label = item.label
          break
        }
      }
      return {
        value,
        label
      }
    },
  },
  watch: {
    isPromoDialog (v) {
      this.dialogState = v
    },
    studio: {
      handler (v) {
        const studio = this.$app.studios.list.find(item => item.id === v)
        const label = (!studio || !studio.name) ? 'Неопознанная локация' : studio.name
        this.newStudio = Object.assign({}, { value: v, label })
      },
      immediate: true
    },
    promocode: {
      handler (v) {
        if (!v) return {}
        let rooms = []
        if (v.rooms) {
          rooms = v.rooms.map(item => {
            return {
              value: item.id,
              label: item.name,
            }
          })
        }
        this.fieldPromocode = Object.assign({}, {
          alias: v.alias,
          id: v.id,
          discount: v.discount,
          type: this.entityLabelByValue(v.type, this.allTypes),
          minPrice: v.minPrice,
          isPublic: this.entityLabelByValue(v.isPublic, this.allStatuses),
          rooms: rooms
        })
        this.dateFrom = v.dateFrom
        this.dateTo = v.dateTo
        this.startedAt = v.startedAt
        this.expiredAt = v.expiredAt
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
