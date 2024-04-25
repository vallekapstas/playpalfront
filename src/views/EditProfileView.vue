<template>
  <!--todo: kasutada ProfileInputComponent-->

  <!--todo: loo nupp mis kääivitab PUT /user/{userId} teenuse-->

  <div class="container bg-light border border-2 border-primary rounded-2 py-3 px-4 m-4 shadow-sm mx-auto">

    <div class="row">
      <div class="col">
        <h1>Muuda profiil</h1>
        <ProfileInputComponent ref="profileInfo" :user-id="1"/>
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

  // todo: too ära kasutaja andmed GET /user/userId
  // todo: saad andmed kätte
  // todo: profileInputComponentRef abil väärtusta ärd userProfileInfo objekt


  // todo: loo meetod mis valideerib ära kõik väljad, (ProfileInputComponent-s vajalikud meetodid olemas)
  // todo: saada PUT sõnum et salvestada muudatused


  data() {
    return {

      userProfileInfo: {
        userId: 0,
        username: '',
        roleId: 0,
        genderId: 0,
        genderName: '',
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
      userIdInfo: {
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
          })
          .catch(error => {
            const errorResponseJSON = error.response.data
          })
    },

    updateUserProfile() {

      this.saveDataToSessionStorage()
      if (this.allFieldsWithCorrectInput())
        this.saveUserIdInfo()

      router.push({name: 'profileRoute'})


    },

    allFieldsWithCorrectInput() {
      this.validFirstName = this.userProfileInfo.firstName.length > 0
      this.validLastName = this.userProfileInfo.lastName.length > 0
      this.validUsername = this.userProfileInfo.username.length > 0
      this.validBirthDate = this.userProfileInfo.birthDate.length > 0
      this.validCountry = this.country > 0
      this.validCounty = this.county > 0
      this.validCity = this.userProfileInfo.cityId > 0
      this.validGender = this.userProfileInfo.genderId > 0

      return this.validFirstName && this.validLastName && this.validUsername && this.validBirthDate
          && this.validCountry && this.validCounty && this.validCity && this.validGender
    },


    saveDataToSessionStorage() {
      sessionStorage.setItem('userProfileInfo', this.userProfileInfo.userId)

    },

    saveUserIdInfo() {
      this.$http.put(`/user/${this.userIdInfo.userId}`, this.userIdInfo
      ).then(response => {
        this.userIdInfo = response.data
      }).catch(error => {
        const errorResponseJSON = error.response.data
      })
    },


  },

  mounted() {
    this.getUserProfileInfo()
    this.saveUserIdInfo()
  }

}
</script>



