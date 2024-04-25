<template>
  <div class="container text-center" @input="clearErrors">

    <div class="row">

      <div class="col-lg">

        <div class="row mb-3">
          <div class="col">
            <label for="firstName" class="form-label text-primary fw-lighter"><b>Eesnimi*</b></label>
            <input v-model="userProfileInfo.firstName" type="text" class="form-control border-primary-subtle font-monospace shadow-sm"
                   id="firstName" required>
            <div v-if="!validFirstName" class="input-invalid">Palun sisesta eesnimi!</div>
          </div>
          <div class="col">
            <label for="lastName" class="form-label text-primary fw-lighter"><b>Perekonnanimi*</b></label>
            <input v-model="userProfileInfo.lastName" type="text" class="form-control border-primary-subtle font-monospace shadow-sm"
                   id="lastName" required>
            <div v-if="!validLastName" class="input-invalid">Palun sisesta perekonnanimi!</div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <label for="validationCustomUsername"
                   class="form-label text-primary fw-lighter"><b>Kasutajanimi*</b></label>
            <div class="input-group">
              <input type="text" class="form-control border-primary-subtle font-monospace shadow-sm"
                     id="validationCustomUsername" required v-model="userProfileInfo.username"
                     @input="validateUserName">
              <span class="input-group-text" id="inputGroupPrepend">
                <span v-if="isCheckingUserName" class="status-text">Checking...</span>
                <span v-if="userProfileInfo.username.length > 0 && !isUserNameAvailable" class="rejection-tick">❌</span>
                <span v-if="userProfileInfo.username.length > 0 && isUserNameAvailable" class="approval-tick">✔️</span>
              </span>
            </div>
            <div v-if="!isUserNameAvailable" class="input-invalid">{{ errorMessage }}</div>
            <div v-if="!validUsername" class="input-invalid">Palun sisesta kasutajanimi!</div>
          </div>
          <div class="col">
            <label for="firstName" class="form-label text-primary fw-lighter"><b>Sünnikuupäev*</b></label>
            <input v-model="userProfileInfo.birthDate" type="date" class="form-control border-primary-subtle font-monospace shadow-sm"
                   :max="getYesterday()"
                   @change="validateBirthDate" required>
            <div v-if="!validBirthDate" class="input-invalid">Palun sisesta sünnikuupäev!</div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <label for="password" class="form-label text-primary fw-lighter"><b>Parool*</b></label>
            <input v-model="userProfileInfo.password" type="password" id="inputPassword5"
                   class="form-control border-primary-subtle font-monospace shadow-sm"
                   aria-describedby="passwordHelpBlock" required>
            <div v-if="!validPassword" class="input-invalid">Palun sisesta parool!</div>
          </div>
          <div class="col">
            <label for="password" class="form-label text-primary fw-lighter"><b>Parool uuesti*</b></label>
            <input v-model="passwordRepeat" type="password" id="inputPassword6"
                   class="form-control border-primary-subtle font-monospace shadow-sm"
                   aria-describedby="passwordHelpBlock" required>
            <div v-if="!matchingPassword" class="input-invalid">Sisestatud paroolid on erinevad!</div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <label class="form-label text-primary fw-lighter"><b>Elukoht*</b></label>
            <LocationDropdownsComponent @event-selected-country-change="setCountryId"
                                        @event-selected-county-change="setCountyId"
                                        @event-selected-city-change="setCityId"/>
            <div v-if="!validCountry || !validCounty || !validCity" class="col-md-4 input-invalid">
              Palun sisesta elukoht!
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <label for="firstName" class="form-label text-primary fw-lighter"><b>Sugu*</b></label>
            <div class="row justify-content-center">
              <div class="col">
                <button class="btn w-100 font-monospace shadow-sm"
                        :class="{ 'btn-outline-secondary': selectedGender !== 'female', 'btn-secondary': selectedGender === 'female' }"
                        type="button" @click="selectGenderId('female')">
                  Naine
                </button>
              </div>
              <div class="col">
                <button class="btn w-100"
                        :class="{ 'btn-outline-secondary font-monospace': selectedGender !== 'male', 'btn-secondary font-monospace': selectedGender === 'male' }"
                        type="button" @click="selectGenderId('male')">
                  Mees
                </button>
              </div>
              <div v-if="!validGender" class="col input-invalid">
                Palun vali sugu!
              </div>
            </div>
          </div>
          <div class="col">
            <label for="profileImage" class="form-label text-primary fw-lighter"><b>Profiilipilt</b></label>
            <ImageInput @event-new-image-file-selected="setProfileImage"/>
          </div>
        </div>


        <div class="row mb-3">
          <div class="col form-floating">
              <textarea v-model="userProfileInfo.interestedIn" class="form-control border-primary-subtle font-monospace shadow-sm"
                        id="floatingTextareaInterests"></textarea>
            <label for="floatingTextareaInterests" class="text-primary fw-lighter">Lemmikmängud</label>
          </div>
        </div>


        <div class="row mb-3">
          <div class="col form-floating">
              <textarea v-model="userProfileInfo.introduction" class="form-control border-primary-subtle font-monospace"
                        id="floatingTextareaIntroduction"></textarea>
            <label for="floatingTextareaIntroduction" class="text-primary fw-lighter">Enesetutvustus</label>
          </div>
        </div>


      </div>


      <div class="col-lg-4">
        <ProfileImageComponent :profile-image="userProfileInfo.profileImage" id="profileImage"/>
        <RemoveImageComponent @event-clear-image-file="userProfileInfo.profileImage = ''  "/>

      </div>

    </div>


  </div>
</template>


<script>
import LocationDropdownsComponent from "@/components/input/LocationDropdownsComponent.vue";
import ProfileImageComponent from "@/components/input/ProfileImageComponent.vue";
import RemoveImageComponent from "@/components/input/RemoveImageComponent.vue";
import ImageInput from "@/components/image/ImageInput.vue";

export default {
  name: 'ProfileInputComponent',
  components: {ImageInput, RemoveImageComponent, LocationDropdownsComponent, ProfileImageComponent},

  data() {
    return {

      userProfileInfo: {
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        cityId: 0,
        genderId: 0,
        birthDate: 0,
        interestedIn: '',
        introduction: '',
        profileImage: ''
      },

      isCheckingUserName: false,
      errorMessage: '',
      selectedGender: '',
      passwordRepeat: '',
      country: 0,
      county: 0,
      gender: '',


      validFirstName: true,
      validLastName: true,
      validUsername: true,
      validBirthDate: true,
      validPassword: true,
      validRepeatPassword: true,
      matchingPassword: true,
      validCountry: true,
      validCounty: true,
      validCity: true,
      validGender: true
    }
  },
  methods: {

    setProfileImage(imageData) {
      this.userProfileInfo.profileImage = imageData
    },

    async validateUserName() {
      const trimmedUserName = this.userProfileInfo.username.trim(); // Remove leading and trailing spaces
      // Check if the username is not empty
      if (trimmedUserName) {
        try {
          setTimeout(async () => {
            const response = await this.$http.get(`/user/name/${trimmedUserName}`);
            this.isUserNameAvailable = !response.data;
            this.errorMessage = this.isUserNameAvailable ? '' : 'Kasutajanimi on võetud';
          }, 500);
        } catch (error) {
          this.errorMessage = 'Error checking userName availability';
        }
      } else {
        this.errorMessage = ''
      }
    },

    validateBirthDate() {
      const enteredDate = new Date(this.userProfileInfo.birthDate);
      const currentDate = new Date();
      if (enteredDate > currentDate) {
        this.validBirthDate = false;
      } else {
        this.validBirthDate = true;
      }
    },

    getYesterday() {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1); // Subtract 1 day
      return yesterday.toISOString().split('T')[0];
    },

    setCountryId(countryId) {
      this.country = countryId
    },

    setCountyId(countyId) {
      this.county = countyId
    },

    setCityId(cityId) {
      this.userProfileInfo.cityId = cityId
    },

    selectGenderId(gender) {
      this.selectedGender = gender;
      this.userProfileInfo.genderId = this.getGenderId(gender);
    },

    getGenderId(gender) {
      if (gender === 'female') {
        return 1;
      } else {
        return 2;
      }
    },

    allFieldsWithCorrectInput() {
      this.validFirstName = this.userProfileInfo.firstName.length > 0
      this.validLastName = this.userProfileInfo.lastName.length > 0
      this.validUsername = this.userProfileInfo.username.length > 0
      this.validBirthDate = this.userProfileInfo.birthDate.length > 0
      this.validPassword = this.userProfileInfo.password.length > 0
      this.validRepeatPassword = this.passwordRepeat.length > 0
      this.matchingPassword = this.passwordRepeat === this.userProfileInfo.password
      this.validCountry = this.country > 0
      this.validCounty = this.county > 0
      this.validCity = this.userProfileInfo.cityId > 0
      this.validGender = this.userProfileInfo.genderId > 0

      return this.validFirstName && this.validLastName && this.validUsername && this.validBirthDate && this.validPassword
          && this.validRepeatPassword && this.matchingPassword && this.validCountry && this.validCounty && this.validCity && this.validGender
    },

    clearErrors() {
      this.validFirstName = true
      this.validLastName = true
      this.validUsername = true
      this.validBirthDate = true
      this.validPassword = true
      this.validRepeatPassword = true
      this.matchingPassword = true
      this.validCountry = true
      this.validCounty = true
      this.validCity = true
      this.validGender = true
    },

  },
};


</script>