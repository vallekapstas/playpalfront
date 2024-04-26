<template>
  <div class="row text-center">
    <div class="col mb-4">
      <h1>Loo Üritus</h1>
    </div>
  </div>

  <div class="container bg-light border border-2 border-primary rounded-2 py-3 px-4 m-4 shadow-sm mx-auto">
    <div class="container text-center" @input="clearErrors">

      <div class="row">


        <div class="col-lg">

          <div class="row mb-3">
            <div class="col">
              <label for="eventName" class="form-label text-primary fw-lighter"><b>Ürituse Nimi*</b></label>
              <input v-model="eventInfo.eventName" type="text"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="eventName" required>
              <div v-if="!validEventName" class="input-invalid">Palun sisesta ürituse nimi!</div>
            </div>

            <div class="col">
              <label for="venueName" class="form-label text-primary fw-lighter"><b>Toimumiskoht*</b></label>
              <input v-model="eventInfo.venueName" type="text"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="venueName" required>
              <div v-if="!validVenueName" class="input-invalid">Palun sisesta toimumiskoht!</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col">
              <label class="form-label text-primary fw-lighter"><b>Aadress*</b></label>
              <LocationDropdownsComponent @event-selected-country-change="setCountryId"
                                          @event-selected-county-change="setCountyId"
                                          @event-selected-city-change="setCityId"/>
              <div v-if="!validCountry || !validCounty || !validCity" class="col-md-4 input-invalid">
                Palun sisesta Aadress!
              </div>
            </div>
          </div>


          <div class="row mb-3">
            <div class="col">
              <label for="street" class="form-label text-primary fw-lighter"><b>Tänav ja maja nr.*</b></label>
              <input v-model="eventInfo.street" type="text"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="street" required>
              <div v-if="!validStreetName" class="input-invalid">Palun sisesta tänav ja maja nr!</div>
            </div>
            <div class="col">
              <label for="postCode" class="form-label text-primary fw-lighter"><b>Postiindeks*</b></label>
              <input v-model="eventInfo.postCode" type="text"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="postCode" required>
              <div v-if="!validVenueName" class="input-invalid">Palun sisesta Postiindeks!</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col">
              <label for="latitude" class="form-label text-primary fw-lighter"><b>Asukoha laiuskraad</b></label>
              <input v-model="eventInfo.latitude" type="number" step="0.000001"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="latitude" required>
            </div>
            <div class="col">
              <label for="longitude" class="form-label text-primary fw-lighter"><b>Asukoha pikkuskraad</b></label>
              <input v-model="eventInfo.longitude" type="number" step="0.000001"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="longitude" required>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col">
              <label for="startDate" class="form-label text-primary fw-lighter"><b>Algus kuupäev*</b></label>
              <input v-model="eventInfo.startDate" type="date"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     :min="getToday()"
                     id="startDate" required>
              <div v-if="!validStartDate" class="input-invalid">Alguskuupäev!</div>
            </div>
            <div class="col">
              <label for="endDate" class="form-label text-primary fw-lighter"><b>Lõpp Kuupäev*</b></label>
              <input v-model="eventInfo.endDate" type="date"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     :min="getToday()"
                     id="endDate" required>
              <div v-if="!validEndDate" class="input-invalid">Lõpp kuupäev!</div>
            </div>
          </div>


          <div class="row mb-3">
            <div class="col">
              <label for="startTime" class="form-label text-primary fw-lighter"><b>Algus kellaaeg*</b></label>
              <input v-model="eventInfo.startTime" type="time"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="startTime" required>
              <div v-if="!validStartTime" class="input-invalid">Palun sisesta kellaaeg!</div>
            </div>

            <div class="col">
              <label for="endTime" class="form-label text-primary fw-lighter"><b>Lõpp kellaaeg*</b></label>
              <input v-model="eventInfo.endTime" type="time"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="endTime" required>
              <div v-if="!validEndTime" class="input-invalid">Palun sisesta kellaaeg!</div>
            </div>
          </div>


          <div class="row mb-3">
            <div class="col">
              <label for="minPlayers" class="form-label text-primary fw-lighter"><b>Miinimum mängijate arv*</b></label>
              <input v-model="eventInfo.minPlayers" type="number"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="minPlayers" required>
              <div v-if="!validStreetName" class="input-invalid">Min. mängijate arv peab olema vähemalt 1 !</div>
              <div/>
            </div>

            <div class="col">
              <label for="maxPlayers" class="form-label text-primary fw-lighter"><b>Maksimum mängijate arv*</b></label>
              <input v-model="eventInfo.maxPlayers" type="number"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="maxPlayers" required>
              <div v-if="!validVenueName" class="input-invalid">Max. mängijate arv peab olema vähemalt 2!</div>
            </div>
          </div>


          <div class="row mb-3">
            <div class="col">
              <label for="minAge" class="form-label text-primary fw-lighter"><b>Miinimum mängijate vanus*</b></label>
              <input v-model="eventInfo.minAge" type="number"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="minAge" required>
              <div v-if="!validMinAge" class="input-invalid">Min. mängijate vanus peab olema vähemalt 1!</div>
              <div/>
            </div>

            <div class="col">
              <label for="maxAge" class="form-label text-primary fw-lighter"><b>Maksimum mängijate vanus*</b></label>
              <input v-model="eventInfo.maxAge" type="number"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="maxAge" required>
              <div v-if="!validMaxAge" class="input-invalid">Max. mängijate vanus peab olema suurem kui min. vanus!
              </div>
            </div>
          </div>


          <div class="row mb-3">
            <div class="col">
              <label for="fee" class="form-label text-primary fw-lighter"><b>Maksumus*</b></label>
              <input v-model="eventInfo.fee" type="number"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="fee" required>
              <div/>
            </div>

            <div class="col">
              <label for="skill" class="form-label text-primary fw-lighter"><b>Tase*</b></label>
              <select v-model="eventInfo.skillId" type="text"
                      class="form-control border-primary-subtle font-monospace shadow-sm"
                      id="skill" required>
                <option :value=0>Vali Tase</option>
                <option :value=1>Kõik on teretulnud</option>
                <option :value=2>Algaja</option>
                <option :value=3>Edasijõudnu</option>
                <option :value=4>Ekspert</option>
              </select>
              <div v-if="!validMaxAge" class="input-invalid">Palun vali tase!</div>
            </div>
          </div>


          <div class="row mb-3">
            <div class="col">
              <label for="eventGames" class="form-label text-primary fw-lighter"><b>Mängitavad mängud*</b></label>
              <input v-model="eventInfo.eventGames" type="text"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="eventGames" required>
              <div v-if="!validStreetName" class="input-invalid">Palun sisesta vähemalt 1 mäng!</div>
            </div>

            <div class="col">
              <label for="eventGames" class="form-label text-primary fw-lighter"><b>Ürituse Pilt*</b></label>
              <ImageInput @event-new-image-file-selected="setEventImage"/>
              </div>
          </div>


          <div class="row mb-3">
            <div class="col form-floating">
              <textarea v-model="eventInfo.eventDescription" class="form-control border-primary-subtle font-monospace"
                        id="floatingTextareaIntroduction"></textarea>
              <label for="floatingTextareaIntroduction" class="text-primary fw-lighter">Ürituse kirjeldus</label>
            </div>
          </div>


        </div>


      <div class="col-lg-4 mt-5">
              <EventImageComponent :event-image="eventInfo.eventImage" id="eventImage"/>
      </div>
        <div class="row d-grid justify-content-center">
          <div class="col d-flex gap-3 mt-5 mb-2">
            <button class="btn btn-dark shadow-sm" type="submit" @click="goToEventView">Tagasi</button>
            <button class="btn btn-primary shadow-sm" type="button" @click="sendPostEventRequest">Loo üritus</button>
          </div>
        </div>

    </div>

    </div>

  </div>
</template>


<script>
import LocationDropdownsComponent from "@/components/input/LocationDropdownsComponent.vue";
import RemoveImageComponent from "@/components/input/RemoveImageComponent.vue";
import ProfileImageComponent from "@/components/input/ProfileImageComponent.vue";
import EventImageComponent from "@/components/event/EventImageComponent.vue";
import ImageInput from "@/components/image/ImageInput.vue";
import router from "@/router";

export default {
  name: "CreateEventView",
  components: {ImageInput, EventImageComponent, ProfileImageComponent, RemoveImageComponent, LocationDropdownsComponent},
  data() {
    return {
      eventInfo: {

        hostId: 0,
        eventName: '',
        venueName: '',
        startDate: 0,
        endDate: 0,
        startTime: '',
        endTime: '',
        minPlayers: 0,
        maxPlayers: 0,
        minAge: 0,
        maxAge: 0,
        fee: 0,
        skillId: 0,
        cityId: 0,
        postCode: '',
        street: '',
        longitude: 0,
        latitude: 0,
        eventImage: '',
        eventGames: [0],
        eventDescription: ''
      },
      isUserNameAvailable: true,
      validEventName: true,
      validVenueName: true,
      validStreetName: true,
      validStartDate: true,
      validEndDate: true,
      validStartTime: true,
      validEndTime: true,
      validMinAge: true,
      validMaxAge: true,
      validCountry: true,
      validCounty: true,
      validCity: true,
      validGender: true
    }
  },

//   KONTROLLI ET LÕPPKUUPÄEV EI OLEKS ENNE ALGUSKUUPÄEVA
//   Ja kui samal päeval siis lõppkellaaeg ei tohi olla enne alguskellaaega

  methods: {
    setEventImage(imageData) {
      this.eventInfo.eventImage = imageData
    },

    setCountryId(countryId) {
      this.country = countryId
    },

    setCountyId(countyId) {
      this.county = countyId
    },

    setCityId(cityId) {
      this.eventInfo.cityId = cityId
    },

    getToday() {
      const today = new Date();
      today.setDate(today.getDate()); // Subtract 1 day
      return today.toISOString().split('T')[0];
    },
    sendPostEventRequest() {
      this.$http.post("/event", this.eventInfo)
          .then(() => this.handlePostEventResponse())
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },
    handlePostEventResponse() {
      this.goToEventView()
      this.showSuccessMessage()
    },

    showSuccessMessage() {
      const alertParams = {
        style: 'alert-success',
        message: this.eventInfo.eventName + ', Üritus on loodud!'
      }
      this.$emit('event-user-registered', alertParams)
    },

    goToEventView() {
      router.push({name: 'indexRoute'})
    },



  }


}
</script>
