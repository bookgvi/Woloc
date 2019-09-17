<template lang="pug">
  .address-class
    h6.q-mb-md Адрес
    .row.q-pb-lg
      .col
        q-select(
          v-model="fullAddress"
          :options=
          @input.native="getFullAddress($event)"
          @filter="emptyFilter"
          use-input
          fill-input
          hide-selected
          outlined
          dense
        )
    .row.q-pb-lg
      .col.q-pr-sm
        span Country
        q-input(outlined, dense, disable, label="Россия")
      .col
        span City
        q-select(
          v-model="city"
          :options="cityArr"
          @input.native="getCity($event)"
          @filter="emptyFilter"
          input-debounce="0"
          use-input
          fill-input
          hide-selected
          outlined
          dense
        )
          template(v-slot:no-option)
            q-item
              q-item-section.text-grey No results
    .row.q-pb-lg
      .col
        span Address
        q-select(
          v-model="address"
          :options="addressArr"
          @input.native="getAddress($event)"
          @filter="emptyFilter"
          input-debounce="0"
          use-input
          fill-input
          hide-selected
          outlined
          dense
        )
          template(v-slot:no-option)
            q-item
              q-item-section.text-grey No results
    .row.q-pb-lg
      q-img(:src="locationURL")
</template>

<script>
import axios from 'axios'
export default {
  // name: 'ComponentName',
  data () {
    return {
      fullAddress: '',
      fullAddr: '',
      city: 'Москва',
      cityArr: [],
      address: 'ул Ткацкая, д 1',
      addressArr: [],
      coord: {
        lat: '37.718857',
        long: '55.786516'
      },
      locationURL: '',
      options: {
        token: 'daa0567fa0fb73ae73ae7e1e389dfefe52ef35b9',
        yAPI: 'f7da3df2-99ce-456f-b9e5-bc1934a8579a'
      }
    }
  },
  methods: {
    async getCity (e) {
      await axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
        count: 5,
        query: e.target.value,
        from_bound: { value: 'city' },
        to_bound: { value: 'settlement' }
      }, {
        headers: {
          Authorization: `Token ${this.options.token}`
        }
      }).then(resp => {
        this.cityArr = resp.data.suggestions.map(item => {
          if (item.data.city) {
            return item.data.city
          } else if (item.data.settlement_with_type) {
            return item.data.settlement_with_type
          }
        })
      })
    },
    async getAddress (e) {
      await axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
        count: 5,
        query: e.target.value,
        locations: [{
          city: this.city
        }],
        restrict_value: true
      }, {
        headers: {
          Authorization: `Token ${this.options.token}`
        }
      }).then(resp => {
        this.addressArr = resp.data.suggestions.map(item => {
          return `${item.value}`
        })
      })
      await axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${this.options.yAPI}&format=json&geocode=${this.city},${this.address}`)
        .then(resp => {
          this.coord.lat = resp.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[0]
          this.coord.long = resp.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[1]
          this.locationURL = `https://static-maps.yandex.ru/1.x/?ll=${this.coord.lat},${this.coord.long}&size=450,450&z=16&l=map&pt=${this.coord.lat},${this.coord.long},pmwtm1~${this.coord.lat},${this.coord.long},pmwtm`
        })
    },
    async getFullAddress (e) {
      await axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
        count: 5,
        query: e.target.value,
      }, {
        headers: {
          Authorization: `Token ${this.options.token}`
        }
      }).then(resp => {
        this.addressArr = resp.data.suggestions.map(item => {
          return `${item.value}`
        })
      })
      await axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${this.options.yAPI}&format=json&geocode=${this.city},${this.address}`)
        .then(resp => {
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
