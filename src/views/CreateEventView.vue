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
              <label for="venueName" class="form-label text-primary fw-lighter"><b>Kohtumispaik*</b></label>
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
              <div v-if="!validPostCode" class="input-invalid">Palun sisesta Postiindeks!</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col">
              <label for="latitude" class="form-label text-primary fw-lighter"><b>Asukoha laiuskraadid</b></label>
              <input v-model="eventInfo.latitude" type="number" step="0.000001"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="latitude" required>
            </div>
            <div class="col">
              <label for="longitude" class="form-label text-primary fw-lighter"><b>Asukoha pikkuskraadid</b></label>
              <input v-model="eventInfo.longitude" type="number" step="0.000001"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="longitude" required>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col">
              <label for="startDate" class="form-label text-primary fw-lighter"><b>Alguse kuupäev*</b></label>
              <input v-model="eventInfo.startDate" type="date"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     :min="getToday()"
                     id="startDate" required>
              <div v-if="!validStartDate" class="input-invalid">Palun vali alguskuupäev!</div>
            </div>
            <div class="col">
              <label for="endDate" class="form-label text-primary fw-lighter"><b>Lõpu kuupäev*</b></label>
              <input v-model="eventInfo.endDate" type="date"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     :min="eventInfo.startDate"
                     id="endDate" required
                     :disabled="!eventInfo.startDate">
              <div v-if="!validEndDate" class="input-invalid">Palun vali lõpp kuupäev!</div>
            </div>
          </div>


          <div class="row mb-3">
            <div class="col">
              <label for="startTime" class="form-label text-primary fw-lighter"><b>Alguse kellaaeg*</b></label>
              <input v-model="eventInfo.startTime" type="time"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="startTime" required>
              <div v-if="!validStartTime" class="input-invalid">Palun sisesta kellaaeg!</div>
            </div>

            <div class="col">
              <label for="endTime" class="form-label text-primary fw-lighter"><b>Lõpu kellaaeg*</b></label>
              <input v-model="eventInfo.endTime" type="time"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="endTime" required>
              <div v-if="!validEndTime" class="input-invalid">Palun sisesta kellaaeg!</div>
            </div>
          </div>


          <div class="row mb-3">
            <div class="col">
              <label for="minPlayers" class="form-label text-primary fw-lighter"><b>Mängijate arv vähemalt</b></label>
              <input v-model="eventInfo.minPlayers" type="number"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="minPlayers" required>
<!--              <div v-if="!validMinPlayers" class="input-invalid">Min. mängijate arv peab olema vähemalt 1 !</div>-->
<!--              <div/>-->
            </div>

            <div class="col">
              <label for="maxPlayers" class="form-label text-primary fw-lighter"><b>Mängijate arv kuni</b></label>
              <input v-model="eventInfo.maxPlayers" type="number"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="maxPlayers" required>
<!--              <div v-if="!validMaxPlayers" class="input-invalid">Max. mängijate arv ei saa olla väiksem kui min.-->
<!--                mängijate arv!-->
<!--              </div>-->
            </div>
          </div>


          <div class="row mb-3">
            <div class="col">
              <label for="minAge" class="form-label text-primary fw-lighter"><b>Mängijate vanus vähemalt</b></label>
              <input v-model="eventInfo.minAge" type="number"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="minAge" required placeholder="">

            </div>

            <div class="col">
              <label for="maxAge" class="form-label text-primary fw-lighter"><b>Mängijate vanus kuni</b></label>
              <input v-model="eventInfo.maxAge" type="number"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="maxAge" required>
            </div>
          </div>


          <div class="row mb-3">
            <div class="col">
              <label for="fee" class="form-label text-primary fw-lighter"><b>Osavõtutasu</b></label>
              <input v-model="eventInfo.fee" type="number"
                     class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="fee" required>
              <div v-if="!validFee" class="input-invalid">Maksumus ei saa olla negatiivne number!</div>
              <div/>
            </div>

            <div class="col">
              <label for="skill" class="form-label text-primary fw-lighter"><b>Tase*</b></label>
              <select v-model="eventInfo.skillId" type="text"
                      class="form-control border-primary-subtle font-monospace shadow-sm"
                      id="skill" required>
                <option :value=0>Vali Tase</option>
                <option v-for="skill in skills" :value="skill.id">{{ skill.name }}</option>
              </select>
              <div v-if="!validSkill" class="input-invalid">Palun vali tase!</div>
            </div>
          </div>


          <!--          <div class="row mb-3">-->
          <!--            <div class="col">-->
          <!--              <label for="eventGames" class="form-label text-primary fw-lighter"><b>Mängitavad mängud*</b></label>-->
          <!--              <input v-model="eventInfo.eventGames" type="text"-->
          <!--                     class="form-control border-primary-subtle font-monospace shadow-sm"-->
          <!--                     id="eventGames" required>-->
          <!--              <div v-if="!validStreetName" class="input-invalid">Palun sisesta vähemalt 1 mäng!</div>-->
          <!--            </div>-->
          <!--          </div>-->


          <div class="row mb-3">
            <div class="col form-floating">
              <textarea v-model="eventInfo.eventDescription" class="form-control border-primary-subtle font-monospace"
                        id="floatingTextareaIntroduction"></textarea>
              <label for="floatingTextareaIntroduction" class="text-primary fw-lighter">Ürituse kirjeldus</label>
<!--              <div v-if="!validEventDescription" class="input-invalid">Palun kirjelda oma üritust!</div>-->
            </div>
          </div>


        </div>


        <div class="col-lg-4">
          <label for="eventGames" class="form-label text-primary fw-lighter"><b>Ürituse pilt</b></label>
          <ImageInput @event-new-image-file-selected="setEventImage"/>
          <EventImageComponent :event-image="eventInfo.eventImage" id="eventImage"/>
          <div class="col">


          </div>

        </div>
        <div class="row d-grid justify-content-center">
          <div class="col d-flex gap-3 mt-5 mb-2">
            <button class="btn btn-dark shadow-sm" type="submit" @click="goToEventView">Tagasi</button>
            <button class="btn btn-primary shadow-sm" type="button" @click="submitEventForm">Loo üritus</button>
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
  components: {
    ImageInput,
    EventImageComponent,
    ProfileImageComponent,
    RemoveImageComponent,
    LocationDropdownsComponent
  },

  data() {
    return {

      eventInfo: {
        hostId: Number(sessionStorage.getItem('userId')),
        eventName: '',
        venueName: '',
        startDate: 0,
        endDate: 0,
        startTime: {
          hour: 0,
          minute: 0,
          second: 0,
          nano: 0
        },
        endTime: {
          hour: 0,
          minute: 0,
          second: 0,
          nano: 0
        },
        minPlayers: '',
        maxPlayers: '',
        minAge: '',
        maxAge: '',
        fee: '',
        skillId: 0,
        cityId: 0,
        postCode: '',
        street: '',
        longitude: 0,
        latitude: 0,
        eventImage: '',

        eventDescription: ''

      },

      country: 0,
      county: 0,
      isUserNameAvailable: true,
      validEventName: true,
      validVenueName: true,
      validStreetName: true,
      validPostCode: true,
      validStartDate: true,
      validEndDate: true,
      validStartTime: true,
      validEndTime: true,
      // validMinPlayers: true,
      // validMaxPlayers: true,
      validFee: true,
      validCountry: true,
      validCounty: true,
      validCity: true,
      validGender: true,
      validSkill: true,
      // validEventDescription: true,

      skills: [
        {
          id: 0,
          name: ''
        }
      ]
    }
  },

  beforeMount() {
    this.getSkills()
  },

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

    getSkills() {
      this.$http.get('/skills')
          .then(response => {
            this.skills = response.data
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },
    
    getToday() {
      const today = new Date();
      today.setDate(today.getDate()); // Subtract 1 day
      return today.toISOString().split('T')[0];
    },

    convertEmptyToZero() {
      if (this.eventInfo.fee === '') {
        this.eventInfo.fee = 0;
      }
    },

    submitEventForm() {
      this.convertEmptyToZero()
      if (this.allFieldsWithCorrectInput()) {
        this.sendPostEventRequest()
      }

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
        message: 'Üritus ' + this.eventInfo.eventName + ' on loodud!'
      }
      this.$emit('event-new-event-created', alertParams)
    },

    goToEventView() {
      router.push({name: 'indexRoute'})
    },

    allFieldsWithCorrectInput() {
      this.validEventName = this.eventInfo.eventName.length > 0
      this.validVenueName = this.eventInfo.venueName.length > 0

      this.validCountry = this.country > 0
      this.validCounty = this.county > 0
      this.validCity = this.eventInfo.cityId > 0

      this.validStreetName = this.eventInfo.street.length > 3
      this.validPostCode = this.eventInfo.postCode.length > 4
      this.validStartDate = this.eventInfo.startDate.length > 0
      this.validEndDate = this.eventInfo.endDate.length > 0
      this.validStartTime = typeof this.eventInfo.startTime === 'string' && this.eventInfo.startTime.trim().length > 0;
      this.validEndTime = typeof this.eventInfo.endTime === 'string' && this.eventInfo.endTime.trim().length > 0;
      // this.validMinPlayers = this.eventInfo.minPlayers > 0
      // this.validMaxPlayers = this.eventInfo.maxPlayers >= this.eventInfo.minPlayers;

      this.validFee = this.eventInfo.fee >= 0
      this.validSkill = this.eventInfo.skillId > 0
      this.validEventDescription = this.eventInfo.eventDescription.length > 0


      return this.validEventName && this.validVenueName && this.validStreetName && this.validPostCode && this.validStartDate
          && this.validEndDate && this.validStartTime && this.validEndTime && this.validCounty && this.validCity && this.validCountry
           &&  this.validFee
          // && this.validEventDescription
    },


  }


}
</script>
