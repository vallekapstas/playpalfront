<template>

  <div class="container">


    <div
        class="event-filter text-start bg-transparent border border-2 border-secondary rounded-2 pt-3 px-4 m-4 shadow-sm">

      <div class="row mb-3 align-items-center d-flex mx-auto gy-2">

        <div class="col-xl-6">

          <div class="row input-group gy-2">
            <label class="col-lg-3 col-form-label text-secondary text-end fw-bold">Staatus</label>

            <div class="col-lg-3">
              <select v-model="params.stscond"
                      class="form-select border border-secondary-subtle input-transparent shadow-sm">
                <option v-for="statusCondition in this.statusConditions"
                        :value="statusCondition.key"
                        :key="statusCondition.key">{{ statusCondition.value }}
                </option>
              </select>
            </div>

            <div class="col-lg-6">
              <select v-model="params.status"
                      class="form-select border border-secondary-subtle input-transparent shadow-sm">
                <option v-for="status in this.statuses" :value="status.key" :key="status.key">
                  {{ status.value }}
                </option>
              </select>
            </div>
          </div>

        </div>

        <div class="col-xl-6">

          <div class="row input-group gy-2">
            <label class="col-lg-2 col-form-label text-secondary text-end fw-bold">Sorteeri</label>

            <div class="col-lg-6">
              <select v-model="params.sortparam"
                      class="form-select border border-secondary-subtle input-transparent shadow-sm">
                <option v-for="sortParameter in this.sortParameters" :value="sortParameter.key" :key="sortParameter.key">
                  {{ sortParameter.value }}
                </option>
              </select>
            </div>

            <div class="col-lg-4">
              <select v-model="params.sortdir"
                      class="form-select border border-secondary-subtle input-transparent shadow-sm">
                <option v-for="sortDirection in this.sortDirections"
                        :value="sortDirection.key"
                        :key="sortDirection.key">{{ sortDirection.value }}
                </option>
              </select>
            </div>
          </div>

        </div>


      </div><!-- main row -->

      <div class="row mb-3 align-items-center d-flex mx-auto px-5">

        <div class="col-lg-5">
          <div class="row input-group gy-2">
            <label class="col-lg-3 col-form-label text-secondary text-end fw-bold">Tase</label>

            <div class="col-lg-9">
              <select v-model="params.skillid"
                      class="form-select border border-secondary-subtle input-transparent shadow-sm">
                <option value="">Kõik tasemed</option>
                <option v-for="skill in this.skills"
                        :value="skill.id"
                        :key="skill.id">{{ skill.name }}
                </option>
              </select>
            </div>

          </div>
        </div>


        <div class="col-lg">

          <div class="row">
            <div class="col-lg input-group my-2">
              <div class="form-check form-switch">
                <input v-model="params.participant"
                       class="form-check-input input-transparent shadow-sm" type="checkbox" role="switch"
                       id="participant">
                <label class="form-check-label fw-bold text-secondary" for="participant">Osalen</label>
              </div>
            </div>

            <div class="col-lg input-group my-2">
              <div class="form-check form-switch">
                <input v-model="params.host" class="form-check-input input-transparent shadow-sm"
                       type="checkbox" role="switch"
                       id="eventhost">
                <label class="form-check-label fw-bold text-secondary" for="eventhost">Korraldan</label>
              </div>
            </div>
          </div>

        </div>

        <div class="col-lg-2 d-grid mx-auto my-1">
          <button class="btn btn-sm btn-primary" @click="sendGetSortedAndFilteredEventsRequest">Otsi</button>
        </div>

      </div><!-- main row -->

      <div class="row align-items-center mx-auto justify-content-center mb-3">
        <span class="pointer link-secondary animate-link small w-auto" data-bs-toggle="collapse" href="#extendedSearch">Täpsem otsing</span>
      </div><!-- main row -->


      <!-- EXTENDED SEARCH STARTS HERE (WITHIN COLLAPSIBLE DIV) -->


      <div class="collapse" id="extendedSearch">


        <div class="row align-items-center mx-auto border-top pt-4 border-bottom border-secondary mb-4 pb-2">

          <div class="col-6">

            <div class="row input-group gy-1" aria-describedby="playersLimitDescription">
              <div class="col-lg align-content-center text-secondary text-center">Osalejate piir</div>

              <div class="col-lg">
                <div class="row">
                  <div class="col">
                    <input v-model="params.minplayers" type="number"
                           class="form-control input-transparent shadow-sm" id="minPlayers"
                           placeholder="-" step="1">
                  </div>
                </div>
              </div>

              <div class="col-lg-1 align-content-center text-secondary text-center me-2">kuni</div>

              <div class="col-lg">
                <div class="row">
                  <div class="col">
                    <input v-model="params.maxplayers" type="number"
                           class="form-control input-transparent shadow-sm" id="maxPlayers"
                           placeholder="-" step="1">
                  </div>
                </div>
              </div>
            </div>
            <div class="row form-text justify-content-center text-center input-helper-text m-2"
                 id="playersLimitDescription">Mängul osalejatele seatud osalejate arvu piir. Sisesta üks või
              mõlemad.Mõlema numbri sisestamise puhul otsitakse vahemikku.
            </div>

          </div>

          <div class="col-6">

            <div class="row input-group gy-1" aria-describedby="ageLimitDescription">
              <div class="col-lg align-content-center text-secondary text-center">Vanusepiir</div>

              <div class="col-lg">
                <div class="row">
                  <div class="col">
                    <input v-model="params.minage" type="number"
                           class="form-control input-transparent shadow-sm" id="minAge" placeholder="-"
                           step="1">
                  </div>
                </div>
              </div>

              <div class="col-lg-1 align-content-center text-secondary text-center me-2">kuni</div>

              <div class="col-lg">
                <div class="row">
                  <div class="col">
                    <input v-model="params.maxage" type="number"
                           class="form-control input-transparent shadow-sm" id="maxAge" placeholder="-"
                           step="1">
                  </div>
                </div>
              </div>
            </div>
            <div class="row form-text justify-content-center text-center input-helper-text m-2"
                 id="ageLimitDescription">Mängul osalejatele seatud vanusepiir. Sisesta üks või mõlemad. Mõlema numbri
              sisestamise puhul otsitakse vahemikku.
            </div>

          </div>

        </div><!-- main row -->

        <div class="row align-items-center mx-auto border-bottom border-secondary mb-4 pb-2">

          <div class="col-6">

            <div class="row input-group gy-1" aria-describedby="feeDescription">
              <div class="col-lg align-content-center text-secondary text-center">Osalustasu</div>

              <div class="col-lg">
                <div class="row">
                  <div class="col">
                    <input v-model="params.minfee" type="number"
                           class="form-control input-transparent shadow-sm" id="minFee" placeholder="-"
                           step="1">
                  </div>
                </div>
              </div>

              <div class="col-lg-1 align-content-center text-secondary text-center me-2">kuni</div>

              <div class="col-lg">
                <div class="row">
                  <div class="col">
                    <input v-model="params.maxfee" type="number"
                           class="form-control input-transparent shadow-sm" id="maxFee" placeholder="-"
                           step="1">
                  </div>
                </div>
              </div>
            </div>
            <div class="row form-text justify-content-center text-center input-helper-text m-2" id="feeDescription">
              Mängu osavõtutasu. Sisesta üks või mõlemad. Mõlema numbri sisestamise puhul otsitakse vahemikku.
            </div>

          </div>

          <div class="col-6">

            <div class="row input-group gy-1" aria-describedby="playersJoinedDescription">
              <div class="col-lg align-content-center text-secondary text-center">Mängijate arv</div>

              <div class="col-lg">
                <div class="row align-items-center">
                  <div class="col">
                    <input v-model="params.minjoined" type="number"
                           class="form-control input-transparent shadow-sm" id="minPlayersJoined"
                           placeholder="-" step="1">
                  </div>
                </div>
              </div>

              <div class="col-lg-1 align-content-center text-secondary text-center me-2">kuni</div>

              <div class="col-lg">
                <div class="row">
                  <div class="col">
                    <input v-model="params.maxjoined" type="number"
                           class="form-control input-transparent shadow-sm" id="maxPlayersJoined"
                           placeholder="-" step="1">
                  </div>
                </div>
              </div>
            </div>
            <div class="row form-text justify-content-center text-center input-helper-text m-2"
                 id="playersJoinedDescription">Mänguga liitunud mängijate arv. Sisesta üks või mõlemad. Mõlema numbri
              sisestamise puhul otsitakse vahemikku.
            </div>

          </div>

        </div><!-- main row -->

        <div class="row align-items-center mx-auto justify-content-center mb-3" aria-describedby="locationDescription">
          <LocationDropdownsComponent class="filter-input"
                                      @event-selected-country-change="handleCountrySelect"
                                      @event-selected-county-change="handleCountySelect"
                                      @event-selected-city-change="handleCitySelect"/>
          <div class="row form-text justify-content-center text-center input-helper-text m-2"
               id="locationDescription">Kõigepealt vali riik, mille peale laetakse nimekiri maakondadest. Kui valid
            seejärel maakonna, laetakse nimekiri selle maakonna linnadest. Viimasena saad valida linna.
          </div>
        </div><!-- main row -->

        <div class="row mb-3 align-items-center mx-auto justify-content-center">
          <div class="col-lg-2 d-grid mx-auto my-1">
            <button class="btn btn-sm btn-primary"  @click="sendGetSortedAndFilteredEventsRequest">Otsi</button>
          </div>
        </div><!-- main row -->

        <div class="row mb-3 align-items-center mx-auto justify-content-center">
          <span class="pointer link-secondary animate-link small w-auto" data-bs-toggle="collapse"
                href="#extendedSearch">Sulge täpsem otsing</span>
        </div><!-- main row -->


      </div><!-- collapsible div -->


    </div><!-- master styling wrapper -->

  </div><!-- container -->

</template>

<script>
import EventImageComponent from "@/components/event/EventImageComponent.vue";
import LocationDropdownsComponent from "@/components/input/LocationDropdownsComponent.vue";
import router from "@/router";

export default {
  name: "EventFilterComponent",
  components: {LocationDropdownsComponent, EventImageComponent},

  data() {
    return {

      params: {
        status: 'A',
        stscond: 'is',
        sortdir: 'ASC',
        sortparam: 'start_date',
        name: '',
        venue: '',
        datefrom: '2024-04-29',
        dateuntil: '',
        participant: '',
        host: '',
        userid: '',
        minplayers: '',
        maxplayers: '',
        minage: '',
        maxage: '',
        minfee: '',
        maxfee: '',
        minjoined: '',
        maxjoined: '',
        countryid: '',
        countyid: '',
        cityid: '',
        skillid: ''
      },

      statuses: [
        {key: 'A', value: 'aktiivne'},
        {key: 'P', value: 'ootel'},
        {key: 'C', value: 'tühistatud'},
      ],

      statusConditions: [
        {key: 'is', value: 'on'},
        {key: 'isnot', value: 'ei ole'}
      ],

      sortDirections: [
        {key: 'ASC', value: 'kasvavalt'},
        {key: 'DESC', value: 'kahanevalt'}
      ],

      sortParameters: [
        {key: 'start_date', value: 'alguskuupäeva järgi'},
        {key: 'end_date', value: 'lõpukuupäeva järgi'},
        {key: 'fee', value: 'tasu järgi'},
        {key: 'joined_players', value: 'osalejate arvu järgi'}
      ],

      skills: [
        {
          id: 0,
          name: ''
        }
      ]

    }
  },

  methods: {

    sendGetSortedAndFilteredEventsRequest() {
      this.$emit('event-get-sorted-and-filtered-events', this.params)
    },

    getSkillsRequest() {
      this.$http.get('/skills')
          .then(response => {
            this.skills = response.data
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },

    handleCountrySelect(countryId) {
      this.params.countryid = countryId
    },

    handleCountySelect(countyId) {
      this.params.countyid = countyId
    },

    handleCitySelect(cityId) {
      this.params.cityid = cityId
    },

    getUserIdFromSession() {
      this.params.userid = sessionStorage.getItem('userId')
    },

    getDateToday() {
      return new Date().toISOString().slice(0, 10)
    }
  },

  mounted() {
    this.getSkillsRequest()
    this.getUserIdFromSession()
  },

};
</script>