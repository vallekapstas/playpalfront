<template>

  <div class="container bg-light border border-2 border-primary rounded-2 py-3 px-4 m-4 shadow-sm mx-auto">

    <div class="row">
      <div class="col">
        <h1>Muuda profiil</h1>
        <ProfileInputComponent ref="profileInputComponentRef"/>
      </div>

    </div>

    <div class="row d-grid justify-content-center">
      <div class="col d-flex gap-3 mt-5 mb-2">
        <button class="btn btn-dark shadow-sm" type="submit" @click="goToProfileRoute">Tagasi</button>
        <button class="btn btn-primary shadow-sm" type="button" @click="updateUserProfile">Uuenda profiili</button>

      </div>
    </div>

  </div>


</template>


<script>
import UserProfileComponent from "@/components/profile/UserProfileComponent.vue";
import ProfileInputComponent from "@/components/input/ProfileInputComponent.vue";
import router from "@/router";

export default {
  name: 'EditProfileView',
  components: {ProfileInputComponent, UserProfileComponent},
  userId: Number(sessionStorage.getItem('userId')),


  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      userProfileInfo: {
        username: '',
        roleId: 0,
        genderId: 0,
        genderName: '',
        countryId: 0,
        countyId: 0,
        cityId: 0,
        cityName: '',
        countyName: '',
        countryName: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        interestedIn: '',
        introduction: '',
        imageData: ''
      },
      userInfoUpdateRequest: {
        username: '',
        firstName: '',
        lastName: '',
        cityId: 0,
        genderId: 0,
        birthDate: '',
        interestedIn: '',
        introduction: '',
        profileImage: ''
      },


      validFirstName: true,
      validLastName: true,
      validUsername: true,
      validBirthDate: true,
      validCountry: true,
      validCounty: true,
      validCity: true,
      validGender: true


    }

  },


  methods: {
    goToProfileRoute() {
      router.push({name: 'profileRoute'})
    },
    getUserProfileInfo() {
      this.$http.get(`/user/${this.userId}`)
          .then(response => {
            this.userProfileInfo = response.data
            this.setProfileInputComponentValues()
          })
          .catch(error => {
            const errorResponseJSON = error.response.data
          })
    },

    setProfileInputComponentValues() {
      this.$refs.profileInputComponentRef.isRegister = false
      this.$refs.profileInputComponentRef.userProfileInfo.firstName = this.userProfileInfo.firstName
      this.$refs.profileInputComponentRef.userProfileInfo.lastName = this.userProfileInfo.lastName
      this.$refs.profileInputComponentRef.userProfileInfo.username = this.userProfileInfo.username
      this.$refs.profileInputComponentRef.userProfileInfo.birthDate = this.userProfileInfo.birthDate
      this.$refs.profileInputComponentRef.userProfileInfo.cityId = this.userProfileInfo.cityId
      this.$refs.profileInputComponentRef.$refs.locationDropdownsComponentRef.selectedCountryId = this.userProfileInfo.countryId
      this.$refs.profileInputComponentRef.$refs.locationDropdownsComponentRef.selectedCountyId = this.userProfileInfo.countyId
      this.$refs.profileInputComponentRef.$refs.locationDropdownsComponentRef.selectedCityId = this.userProfileInfo.cityId
      this.$refs.profileInputComponentRef.$refs.locationDropdownsComponentRef.sendGetCountriesRequest()
      this.$refs.profileInputComponentRef.$refs.locationDropdownsComponentRef.sendGetCountiesRequest()
      this.$refs.profileInputComponentRef.$refs.locationDropdownsComponentRef.sendGetCitiesRequest()

      let gender = 'male'
      if (this.userProfileInfo.genderId === 1) {
        gender = 'female'
      }
      this.$refs.profileInputComponentRef.selectGenderId(gender)


      this.$refs.profileInputComponentRef.userProfileInfo.interestedIn = this.userProfileInfo.interestedIn
      this.$refs.profileInputComponentRef.userProfileInfo.introduction = this.userProfileInfo.introduction
      this.$refs.profileInputComponentRef.userProfileInfo.profileImage = this.userProfileInfo.imageData

    },
    getProfileInputComponentValues() {

      this.userInfoUpdateRequest.username = this.$refs.profileInputComponentRef.userProfileInfo.username
      this.userInfoUpdateRequest.firstName = this.$refs.profileInputComponentRef.userProfileInfo.firstName
      this.userInfoUpdateRequest.lastName = this.$refs.profileInputComponentRef.userProfileInfo.lastName
      this.userInfoUpdateRequest.cityId = this.$refs.profileInputComponentRef.userProfileInfo.cityId
      this.userInfoUpdateRequest.genderId = this.$refs.profileInputComponentRef.userProfileInfo.genderId
      this.userInfoUpdateRequest.birthDate = this.$refs.profileInputComponentRef.userProfileInfo.birthDate
      this.userInfoUpdateRequest.interestedIn = this.$refs.profileInputComponentRef.userProfileInfo.interestedIn
      this.userInfoUpdateRequest.introduction = this.$refs.profileInputComponentRef.userProfileInfo.introduction
      this.userInfoUpdateRequest.profileImage = this.$refs.profileInputComponentRef.userProfileInfo.profileImage
    },
    updateUserProfile() {
      if (this.$refs.profileInputComponentRef.allEditFieldsWithCorrectInput) {
        this.getProfileInputComponentValues()
        this.sendPutUserRequest();

      }

    },

    sendPutUserRequest() {

      this.$http.put(`/user/${this.userId}`, this.userInfoUpdateRequest
      ).then(response => {
        this.userInfoUpdateRequest = response.data
        router.push({name: 'profileRoute'})
      }).catch(error => {
        const errorResponseJSON = error.response.data

      })

    },

  },

  mounted() {
    this.getUserProfileInfo()

  }

}
</script>



