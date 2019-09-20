<template lang="pug">
  .address-class
    h6.q-mb-md Адрес
    .row.q-pb-lg
      .col-8.q-pr-sm
        q-select(
          v-model="fullAddress"
          :options="fullAddressArr"
          @input.native="getFullAddress($event)"
          @keyup.native.enter="showOnMap"
          @filter="emptyFilter"
          use-input
          fill-input
          display-value
          outlined
          dense
        )
          template(v-slot:no-option)
            q-item
              q-item-section.text-grey No results
      .col-4.q-pl-sm
        q-btn.block(label="Показать на карте" @click="showOnMap")
    .row.q-pb-lg
      yandexMap(
        :settings="options.yaMap"
        map-type="map"
        zoom=18
        :coords="coord"
        :controls="yControls"
        style="width: 100%; height: 480px"
        @click="setAddress"
      )
        ymapMarker(
          v-if="isMarker"
          :coords="coord"
          marker-id="1"
        )
    .row.q-pb-lg
      .col
        span Инструкция пешком
        q-input.q-pt-sm(
          type="textarea"
          v-model="instWalk"
          outlined
          rows="4"
        )
    .row.q-pb-lg
      .col
        span Инструкция на машине
        q-input.q-pt-sm(
          type="textarea"
          v-model="instAuto"
          outlined
          rows="4"
        )
</template>

<script>
import axios from 'axios'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default {
  components: { yandexMap, ymapMarker },
  data () {
    return {
      fullAddress: 'г Москва, ул Ткацкая, д 1',
      fullAddressArr: [],
      coord: [55.786516, 37.718857],
      isMarker: true,
      yControls: [],
      options: {
        token: 'daa0567fa0fb73ae73ae7e1e389dfefe52ef35b9',
        yaMap: {
          yAPI: 'f7da3df2-99ce-456f-b9e5-bc1934a8579a'
        }
      },
      instWalk: 'Выйдя из метро идите вдоль торговых рядов вдоль и железной дороги. Перейдя железнодорожные пути пройдите через шлагбаум на территорию бывшего завода Станколит ...',
      instAuto: ''
    }
  },
  async mounted () {
    // await this.showOnMap()
  },
  methods: {
    async getFullAddress (e) {
      this.fullAddress = e.target.value
      await axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
        count: 5,
        query: e.target.value,
      }, {
        headers: {
          Authorization: `Token ${this.options.token}`
        }
      }).then(resp => {
        this.fullAddressArr = resp.data.suggestions.map(item => {
          return `${item.value}`
        })
      })
        .catch(err => { console.error('Catched...', err) })
    },
    async showOnMap () {
      this.isMarker = false
      await axios.get(`https://geocode-maps.yandex.ru/1.x/`, {
        params: {
          apikey: this.options.yaMap.yAPI,
          format: 'json',
          geocode: this.fullAddress
        }
      }).then(resp => {
        this.coord.splice(1, 1, +resp.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[0])
        this.coord.splice(0, 1, +resp.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[1])
      })
        .catch(err => { console.error('Catched...', err) })
      this.isMarker = true
    },
    async setAddress (e) {
      this.isMarker = false
      this.coord = e.get('coords')
      await axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address', {
        lat: this.coord[0],
        lon: this.coord[1]
      }, {
        headers: {
          Authorization: `Token ${this.options.token}`
        }
      }).then(resp => { this.fullAddress = resp.data.suggestions[0].value })
        .catch(err => { console.error('Catched...', err) })
      this.isMarker = true
    },
    emptyFilter (val, update) {
      update(() => {})
    }
  }
}
</script>
