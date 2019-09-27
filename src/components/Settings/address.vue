<template lang="pug">
  .address-class
    h6.q-mb-md Адрес
    .row.q-pb-lg
      .col-8.q-pr-sm
        q-select(
          v-if="datas.address"
          v-model="datas.address"
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
        v-if="datas.lat"
        :settings="options.yaMap"
        map-type="map"
        zoom=18
        :coords="[datas.lat, datas.lon]"
        :controls="yControls"
        :placemarks="[datas.lat, datas.lon]"
        style="width: 100%; height: 480px"
        @click="setAddress"
      )
       ymap-marker(
        marker-id="1"
        :coords="[datas.lat, datas.lon]"
        :balloon="{header: 'First'}"
      )
    .row.q-pb-lg
      .col
        span Инструкция пешком
        q-input.q-pt-sm(change
          type="textarea"
          v-model="datas.foot"
          outlined
          rows="4"
        )
    .row.q-pb-lg
      .col
        span Инструкция на машине
        q-input.q-pt-sm(
          type="textarea"
          v-model="datas.car"
          outlined
          rows="4"
        )
</template>

<script>
import axios from 'axios'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default {
  props: {
    datas: Object
  },
  components: { yandexMap, ymapMarker },
  data () {
    return {
      fullAddressArr: [],
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
  methods: {
    async getFullAddress (e) {
      this.datas.address = e.target.value
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
      await axios.get(`https://geocode-maps.yandex.ru/1.x/`, {
        params: {
          apikey: this.options.yaMap.yAPI,
          format: 'json',
          geocode: this.datas.address
        }
      }).then(resp => {
        this.datas.lon = +resp.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[0]
        this.datas.lat = +resp.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[1]
      })
        .catch(err => { console.error('Catched...', err) })
    },
    async setAddress (e) {
      this.datas.lon = e.get('coords')[1]
      this.datas.lat = e.get('coords')[0]
      await axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address', {
        lat: this.datas.lat,
        lon: this.datas.lon
      }, {
        headers: {
          Authorization: `Token ${this.options.token}`
        }
      }).then(resp => { this.datas.address = resp.data.suggestions[0].value })
        .catch(err => { console.error('Catched...', err) })
    },
    emptyFilter (val, update) {
      update(() => {})
    }
  }
}
</script>
