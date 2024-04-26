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
            <label for="startDate" class="form-label text-primary fw-lighter"><b>Alguskuupäev*</b></label>
            <input v-model="eventInfo.startDate" type="date" class="form-control border-primary-subtle font-monospace shadow-sm"
                   :min="getToday()"
                   id="startDate" required>
            <div v-if="!validStartDate" class="input-invalid">Alguskuupäev!</div>
          </div>
          <div class="col">
            <label for="endDate" class="form-label text-primary fw-lighter"><b>LõppKuupäev*</b></label>
            <input v-model="eventInfo.endDate" type="date" class="form-control border-primary-subtle font-monospace shadow-sm"
                   :min="getToday()"
                   id="endDate" required>
            <div v-if="!validEndDate" class="input-invalid">Lõppkuupäev!</div>
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


    </div>
  </div>

  </div>
  </div>
</template>


<script>
import LocationDropdownsComponent from "@/components/input/LocationDropdownsComponent.vue";

export default {
  name: "CreateEventView",
  components: {LocationDropdownsComponent},
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
      matchingPassword: true,
      validCountry: true,
      validCounty: true,
      validCity: true,
      validGender: true
  }
},

//   KONTROLLI ET LÕPPKUUPÄEV EI OLEKS ENNE ALGUSKUUPÄEVA
//   Ja kui samal päeval siis lõppkellaaeg ei tohi olla enne alguskellaaega

methods: {
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



}


}
</script>
