<template>

  <div class="container">


    <div
        class="event-filter text-start bg-transparent border border-2 border-secondary rounded-2 pt-3 px-4 m-4 shadow-sm">

      <div class="row mb-3 align-items-center d-flex mx-auto">

        <div class="col-6">

          <div class="row input-group gy-1">
            <label class="col-lg-3 col-form-label text-secondary text-end fw-bold">Staatus</label>

            <div class="col-lg-4">
              <select class="form-select border border-secondary-subtle input-transparent shadow-sm">
                <option value="1">on</option>
                <option value="2">ei ole</option>
              </select>
            </div>

            <div class="col-lg-5">
              <select class="form-select border border-secondary-subtle input-transparent shadow-sm">
                <option value="1">aktiivne</option>
                <option value="2">ootel</option>
                <option value="2">tühistatud</option>
              </select>
            </div>
          </div>

        </div>

        <div class="col-5">

          <div class="row">
            <div class="col-lg input-group my-2">
              <div class="form-check form-switch">
                <input class="form-check-input input-transparent shadow-sm" type="checkbox" role="switch"
                       id="participant">
                <label class="form-check-label fw-bold text-secondary" for="participant">Olen osaleja</label>
              </div>
            </div>

            <div class="col-lg input-group my-2">
              <div class="form-check form-switch">
                <input class="form-check-input input-transparent shadow-sm" type="checkbox" role="switch"
                       id="eventhost">
                <label class="form-check-label fw-bold text-secondary" for="eventhost">Olen korraldaja</label>
              </div>
            </div>
          </div>

        </div>

        <div class="col d-grid mx-auto my-1">
          <button class="btn btn-sm btn-primary">Otsi</button>
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
                    <input type="number" class="form-control input-transparent shadow-sm" id="minPlayers"
                           placeholder="-" step="1">
                  </div>
                </div>
              </div>

              <div class="col-lg-1 align-content-center text-secondary text-center me-2">kuni</div>

              <div class="col-lg">
                <div class="row">
                  <div class="col">
                    <input type="number" class="form-control input-transparent shadow-sm" id="maxPlayers"
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
                    <input type="number" class="form-control input-transparent shadow-sm" id="minAge" placeholder="-"
                           step="1">
                  </div>
                </div>
              </div>

              <div class="col-lg-1 align-content-center text-secondary text-center me-2">kuni</div>

              <div class="col-lg">
                <div class="row">
                  <div class="col">
                    <input type="number" class="form-control input-transparent shadow-sm" id="maxAge" placeholder="-"
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
                    <input type="number" class="form-control input-transparent shadow-sm" id="minFee" placeholder="-"
                           step="1">
                  </div>
                </div>
              </div>

              <div class="col-lg-1 align-content-center text-secondary text-center me-2">kuni</div>

              <div class="col-lg">
                <div class="row">
                  <div class="col">
                    <input type="number" class="form-control input-transparent shadow-sm" id="maxFee" placeholder="-"
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
                    <input type="number" class="form-control input-transparent shadow-sm" id="minPlayersJoined"
                           placeholder="-" step="1">
                  </div>
                </div>
              </div>

              <div class="col-lg-1 align-content-center text-secondary text-center me-2">kuni</div>

              <div class="col-lg">
                <div class="row">
                  <div class="col">
                    <input type="number" class="form-control input-transparent shadow-sm" id="maxPlayersJoined"
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
            <button class="btn btn-sm btn-primary">Otsi</button>
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

export default {
  name: "EventFilterComponent",
  components: {LocationDropdownsComponent, EventImageComponent},

  data() {
    return {
      selectedStatus: 'A',
      statuses: [
        {key: 'A', value: 'Aktiivne'},
        {key: 'P', value: 'Ootel'},
        {key: 'C', value: 'Tühistatud'},
      ],

      selectedStatusCondition: 'is',
      statusConditions: [
        {key: 'is', value: 'on'},
        {key: 'isnot', value: 'ei ole'}
      ],

      selectedCountryId: 0,
      selectedCountyId: 0,
      selectedCityId: 0

    }
  },

  methods: {
    handleCountrySelect(countryId) {
      this.selectedCountryId = countryId
    },

    handleCountySelect(countyId) {
      this.selectedCountyId = countyId
    },

    handleCitySelect(cityId) {
      this.selectedCityId = cityId
    },
  }
}
</script>