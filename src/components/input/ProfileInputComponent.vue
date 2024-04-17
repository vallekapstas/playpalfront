<template>
  <div @input="clearErrors"
       class="text-start bg-light border border-2 border-primary rounded-2 py-3 px-4 m-4 shadow-sm">
    <div class="row col-11 mx-auto needs-validation" novalidate>
      <div class="col-md-4" style="margin-top: 30px;">
        <label for="firstName" class="form-label">Eesnimi*</label>
        <input v-model="firstName" type="text" class="form-control" id="firstName" value="required">
        <div v-if="!validFirstName" class="input-invalid">
          Palun sisesta eesnimi!
        </div>
      </div>

      <div class="col-md-4" style="margin-top: 30px;">
        <label for="lastName" class="form-label">Perekonnanimi*</label>
        <input v-model="lastName" type="text" class="form-control" id="lastName" value="required">
        <div v-if="!validLastName" class="input-invalid">
          Palun sisesta perekonnanimi!
        </div>
      </div>

      <div class="col-md-4">
        <img class="img-fluid" src="../../assets/red_dice.png" alt="profile image" style="height: 100px"/>
      </div>

      <div class="col-md-4" style="margin-top: 30px;">
        <label for="validationCustomUsername" class="form-label">Kasutajanimi*</label>

        <div class="input-group">

          <input type="text" class="form-control" id="validationCustomUsername" required v-model="userName"
                 @input="validateUserName">

          <span class="input-group-text" id="inputGroupPrepend">
            <span v-if="isCheckingUserName" class="status-text">Checking...</span>
            <span v-if="userName.length > 0 && !isUserNameAvailable" class="rejection-tick">❌</span>
            <span v-if="userName.length > 0 && isUserNameAvailable" class="approval-tick">✔️</span>
          </span>

        </div>

        <div v-if="!isUserNameAvailable" class="input-invalid">
          {{ errorMessage }}
        </div>

        <div v-if="!validUserName" class="input-invalid">
          Palun sisesta kasutajanimi!
        </div>

      </div>

      <div class="col-md-4" style="margin-top: 30px;">
        <label for="firstName" class="form-label">Sünnikuupäev*</label>
        <input v-model="birtDate" type="date" class="form-control" value="required">
        <div v-if="!validBirtDate" class="input-invalid">
          Palun sisesta sünnikuupäev!
        </div>
      </div>

      <div class="col-md-4"></div>

      <div class="col-md-4" style="margin-top: 30px;">
        <label for="password" class="form-label">Parool*</label>
        <input v-model="password" type="password" id="inputPassword5" class="form-control"
               aria-describedby="passwordHelpBlock" value="required">
        <div v-if="!validPassword" class="input-invalid">
          Palun sisesta parool!
        </div>
      </div>

      <div class="col-md-4" style="margin-top: 30px;">
        <label for="password" class="form-label">Parool uuesti*</label>
        <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"
               value="required">
        <div class="valid-feedback">
          Palun sisesta parool uuesti!
        </div>
      </div>


      <div style="margin-top: 20px;">
        <label class="form-label">Elukoht*</label>
        <LocationDropdownsComponent @event-selected-country-change="setCountryId"
                                    @event-selected-county-change="setCountyId"
                                    @event-selected-city-change="setCityId"/>

        <div v-if="!validCountry || !validCounty || !validCity" class="col-md-4 input-invalid">
          Palun sisesta elukoht!
        </div>

      </div>


      <div class="col-md-12 text-center" style="margin-top: 30px;">
        <label for="firstName" class="form-label">Sugu*</label>

        <div class="row justify-content-center">
          <div class="col-md-4">
            <button class="btn"
                    :class="{ 'btn-outline-secondary': selectedGender !== 'female', 'btn-secondary': selectedGender === 'female' }"
                    type="button" style="width: 100%" @click="selectGender('female')">
              Naine
            </button>
          </div>
          <div class="col-md-4">
            <button class="btn"
                    :class="{ 'btn-outline-secondary': selectedGender !== 'male', 'btn-secondary': selectedGender === 'male' }"
                    type="button" style="width: 100%" @click="selectGender('male')">
              Mees
            </button>
          </div>
        </div>
      </div>

      <div class="form-floating" style="margin-top: 30px;">
        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
        <label for="floatingTextarea">Lemmikmängud</label>
      </div>

      <div class="form-floating" style="margin-top: 30px;">
        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
        <label for="floatingTextarea">Enesetutvustus</label>
      </div>


      <div class="col" style="margin-top: 80px; display: flex; justify-content: space-evenly;">
        <button class="btn btn-primary" type="submit" @click="goToEventView">tagasi</button>
        <button class="btn btn-primary" type="submit" @click="submitForm">Registreeri</button>
      </div>


    </div>
  </div>
</template>


<script>
import LocationDropdownsComponent from "@/components/input/LocationDropdownsComponent.vue";
import router from "@/router";
import locationDropdownsComponent from "@/components/input/LocationDropdownsComponent.vue";

export default {
  name: "ProfileInputComponent",
  computed: {
    locationDropdowns() {
      return locationDropdownsComponent
    }
  },
  components: {LocationDropdownsComponent},
  data() {
    return {
      userName: '',
      isUserNameAvailable: true,
      errorMessage: '',
      selectedGender: null,
      firstName: '',
      lastName: '',
      password: true,
      birtDate: true,
      country: 0,
      county: 0,
      city: 0,
      validFirstName: true,
      validLastName: true,
      validUserName: true,
      validBirtDate: true,
      validPassword: true,
      validCountry: true,
      validCounty: true,
      validCity: true


    }

  },
  methods: {

    async validateUserName() {
      const trimmedUserName = this.userName.trim(); // Remove leading and trailing spaces

      // Check if the username is not empty
      if (trimmedUserName) {
        try {
          setTimeout(async () => {
            const response = await this.$http.get(`/user/${trimmedUserName}`);
            this.isUserNameAvailable = !response.data;
            this.errorMessage = this.isUserNameAvailable ? '' : 'Kasutajanimi on võetud';
          }, 500);
        } catch (error) {
          console.error('Error checking userName availability:', error);
          this.errorMessage = 'Error checking userName availability';
        }
      } else {
        this.errorMessage = ''
      }
    },
    setCountryId(countryId) {
      this.country = countryId
    },
    setCountyId(countyId) {
      this.county = countyId

    },
    setCityId(cityId) {
      this.city = cityId

    },
    submitForm() {
      if (this.allFieldsWithCorrectInput()) {
        // siis saadame backile sõnumi kasutaja registreerimisekt
      }
    },
    allFieldsWithCorrectInput() {
      this.validFirstName = this.firstName.length > 0
      this.validLastName = this.lastName.length > 0
      this.validUserName = this.userName.length > 0
      this.validBirtDate = this.birtDate.length > 0
      this.validPassword = this.password.length > 0
      this.validCountry = this.country > 0
      this.validCounty = this.county > 0
      this.validCity = this.city > 0


      return this.validFirstName && this.validLastName && this.validUserName && this.validBirtDate && this.validPassword
          && this.validCountry && this.validCounty && this.validCity

    },
    clearErrors() {
      this.validUserName = true
      this.validFirstName = true
      this.validLastName = true
    },
    goToEventView() {
      router.push({name: 'indexRoute'})
    },
    selectGender(gender) {
      this.selectedGender = gender;
    }
  },

};


</script>