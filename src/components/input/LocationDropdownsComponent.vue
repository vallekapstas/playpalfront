<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <select v-model="selectedCountriesId" @change="handleChangeCountry" class="form-select">
          <option selected :value="0">Vali Riik</option>
          <option v-for="country in countries" :value="country.countryId" :key="country.countryId" class="dropdown-item">
            {{ country.countryName }}
          </option>
        </select>
      </div>
      <div class="col">
        <select v-model="selectedCountiesId" @change="handleChangeCounty" class="form-select">
          <option selected :value="0">Vali Maakond</option>
          <option v-for="county in counties" :value="county.countyId" :key="county.countyId" class="dropdown-item">
            {{ county.countyName }}
          </option>
        </select>
      </div>
      <div class="col">
        <select v-model="selectedCitiesId" @change="handleChangeCity" class="form-select">
          <option selected :value="0">Vali Linn</option>
          <option v-for="city in cities" :value="city.cityId" :key="city.cityId" class="dropdown-item">
            {{ city.cityName }}
          </option>
        </select>
      </div>
    </div>
  </div>

</template>


<script>
import router from "@/router";

export default {
  name: "LocationDropdownsComponent",
  data() {
    return {
      selectedCountriesId: 0,
      selectedCountiesId: 0,
      selectedCitiesId: 0,
      countries: [
        {
          countryId: 0,
          countryName: ''
        }
      ],
      counties: [
        {
          countyId: 0,
          countyName: ''
        }
      ],
      cities: [
        {
          cityId: 0,
          cityName: ''
        }
      ]
    }

  },
  methods: {

    sendGetCountriesRequest() {
      this.$http.get('/countries')
          .then(response => {
            this.countries = response.data
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },

    async sendGetCountiesRequest() {
      await this.$http.get(`/counties/country/${this.selectedCountriesId}`)
          .then(response => {
            this.counties = response.data
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },
    async sendGetCitiesRequest() {
      await this.$http.get(`/cities/county/${this.selectedCountiesId}`)
          .then(response => {
            this.cities = response.data
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },

    handleChangeCountry() {
      this.$emit('event-selected-country-change', this.selectedCountriesId)

      if (this.selectedCountriesId === 0) {
        this.resetCounties()
        this.resetCities()
      } else {
        this.resetCounties()
        this.resetCities()
        this.sendGetCountiesRequest();
      }
    },

    handleChangeCounty() {
      this.$emit('event-selected-county-change', this.selectedCountiesId)

      if (this.selectedCountiesId === 0) {
        this.resetCities()
        this.resetCountries()
      } else {
        this.resetCities()
        this.sendGetCitiesRequest();
      }
    },
    handleChangeCity() {
      this.$emit('event-selected-city-change', this.selectedCitiesId)
    },

    resetCounties() {
      this.selectedCountiesId = 0
      this.counties = []
    },

    resetCities() {
      this.selectedCitiesId = 0
      this.cities = []
    },
    resetCountries() {
      this.selectedCountriesId = 0

    },

  },

  beforeMount() {
    this.sendGetCountriesRequest()
    this.resetCounties()
    this.resetCities()

  }

}
</script>
