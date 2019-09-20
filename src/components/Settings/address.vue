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
      q-img(:src="locationURL")
</template>

<script>
import axios from 'axios'
export default {
  // name: 'ComponentName',
  data () {
    return {
      fullAddress: 'г Москва, ул Ткацкая, д 1',
      fullAddressArr: [],
      coord: {
        lat: '37.718857',
        long: '55.786516'
      },
      locationURL: `https://geocode-maps.yandex.ru/1.x/`,
      options: {
        token: 'daa0567fa0fb73ae73ae7e1e389dfefe52ef35b9',
        yAPI: 'f7da3df2-99ce-456f-b9e5-bc1934a8579a'
      }
    }
  },
  async mounted () {
    await this.showOnMap()
  },
  methods: {
    async getFullAddress (e) {
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
    },
    async showOnMap () {
      await axios.get(`https://geocode-maps.yandex.ru/1.x`, {
        params: {
          apikey: this.options.yAPI,
          format: 'json',
          geocode: this.fullAddress
        }
      }).then(resp => {
        this.coord.lat = resp.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[0]
        this.coord.long = resp.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[1]
        this.locationURL = `https://static-maps.yandex.ru/1.x/?ll=${this.coord.lat},${this.coord.long}&size=450,450&z=16&l=map&pt=${this.coord.lat},${this.coord.long},pmwtm1~${this.coord.lat},${this.coord.long},pmwtm`
      })
    },
    emptyFilter (val, update) {
      update(() => {})
    }
  }
}
</script>
