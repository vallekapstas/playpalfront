<template>
  <!--todo: kasutada ProfileInputComponent-->

  <!--todo: loo nupp mis kääivitab PUT /user/{userId} teenuse-->

  <div class="container bg-light border border-2 border-primary rounded-2 py-3 px-4 m-4 shadow-sm mx-auto">

    <div class="row">
      <div class="col">
        <h1>Muuda profiil</h1>
        <ProfileInputComponent ref="ProfileInputComponentRef"/>
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
      }
    }

  },


  methods: {
    goToProfileRoute() {
      router.push({name: 'profileRoute'})
    },
    getUserProfileInfo() {
      this.$http.get(`/user/${this.userProfileInfo.userId}`)
          .then(response => {
            this.userProfileInfo = response.data
          })
          .catch(error => {
            const errorResponseJSON = error.response.data
          })
    },

    updateUserProfile() {
      this.$refs.ProfileInputComponentRef.userProfileInfo
      this.saveDataToSessionStorage()
      if (this.$refs.ProfileInputComponentRef.allFieldsWithCorrectInput())
        this.saveUserIdInfo()

      router.push({name: 'profileRoute'})


    },
    saveDataToSessionStorage() {
      sessionStorage.setItem('userProfileInfo', this.userProfileInfo)

    },

    saveUserIdInfo() {
      this.$http.put(`/editprofile/${this.userIdInfo}`, this.somePayloadDtoObject
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



