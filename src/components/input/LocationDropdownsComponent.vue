<template>
  <div>
    <div class="row">
      <div class="col-xl">
        <select v-model="selectedCountryId" @change="handleChangeCountry" class="form-select border-primary-subtle font-monospace">
          <option selected :value="0">Vali Riik</option>
          <option v-for="country in countries" :value="country.countryId" :key="country.countryId"
                  class="dropdown-item">
            {{ country.countryName }}
          </option>
        </select>
      </div>
      <div class="col-xl">
        <select v-model="selectedCountyId" @change="handleChangeCounty" class="form-select border-primary-subtle font-monospace">
          <option selected :value="0">Vali Maakond</option>
          <option v-for="county in counties" :value="county.countyId" :key="county.countyId" class="dropdown-item">
            {{ county.countyName }}
          </option>
        </select>
      </div>
      <div class="col-xl">
        <select v-model="selectedCityId" @change="handleChangeCity" class="form-select border-primary-subtle font-monospace">
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
      selectedCountryId: 0,
      selectedCountyId: 0,
      selectedCityId: 0,

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
      ],

      countryChangeTimeout: null,
      countyChangeTimeout: null
    }

  },
  methods: {

    sendGetCountriesRequest() {
      this.$http.get('/countries')
          .then(response => {
            this.countries = response.data
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },

    async sendGetCountiesRequest() {
      await this.$http.get(`/counties/country/${this.selectedCountryId}`)
          .then(response => {
            this.counties = response.data
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },
    async sendGetCitiesRequest() {
      await this.$http.get(`/cities/county/${this.selectedCountyId}`)
          .then(response => {
            this.cities = response.data
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },

    handleChangeCountry() {
      clearTimeout(this.countryChangeTimeout);
      this.countryChangeTimeout = setTimeout(() => {
        this.$emit('event-selected-country-change', this.selectedCountryId);

        if (this.selectedCountryId === 0) {
          this.resetCounties();
          this.resetCities();
        } else {
          this.resetCounties();
          this.resetCities();
          this.sendGetCountiesRequest();
        }
      }, 500); // delay
    },

    handleChangeCounty() {
      clearTimeout(this.countyChangeTimeout);
      this.countyChangeTimeout = setTimeout(() => {
        this.$emit('event-selected-county-change', this.selectedCountyId);

        if (this.selectedCountyId === 0) {
          this.resetCities();
        } else {
          this.resetCities();
          this.sendGetCitiesRequest();
        }
      }, 500); // delay
    },

    handleChangeCity() {
      this.$emit('event-selected-city-change', this.selectedCityId)
    },

    resetCounties() {
      this.selectedCountyId = 0
      this.counties = []
    },

    resetCities() {
      this.selectedCityId = 0
      this.cities = []
    },

  },

  beforeMount() {
    this.sendGetCountriesRequest()
    this.resetCounties()
    this.resetCities()

  }

}
</script>
