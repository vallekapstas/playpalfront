<template>
  <div
      class="text-start bg-light border border-2 border-primary rounded-2 py-3 px-4 m-4 shadow-sm">
    <div class="row col-11 mx-auto needs-validation" novalidate>
      <div class="container text-center">
        <div class="row">
          <div class="col-12" style="margin-bottom: 30px;">
            <h1>Registreeri kasutajaks</h1>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <ProfileInputComponent ref="profileInputComponentRef" @event-selected-city-change="setCityId"/>
          </div>
        </div>
      </div>
      <div class="col" style="margin-top: 80px; display: flex; justify-content: space-evenly;">
        <button class="btn btn-primary" type="submit" @click="goToEventView">tagasi</button>
        <button class="btn btn-primary" type="button" @click="addUserProfile">Registreeri</button>
      </div>
    </div>
  </div>

</template>

<script>
import LocationDropdownsComponent from "@/components/input/LocationDropdownsComponent.vue";
import ProfileInputComponent from "@/components/input/ProfileInputComponent.vue";
import router from "@/router";

export default {
  name: "RegisterView",
  components: {ProfileInputComponent, LocationDropdownsComponent},

  data() {
    return {
      successMessage:'',
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
      }

    }
  },
  methods: {
    addUserProfile() {
      this.getAndSetUserProfileValues()
      if (this.$refs.profileInputComponentRef.allFieldsWithCorrectInput()) {
        this.sendPostUserProfileRequest()
      }else {
        this.errorMessage = 'Täida kõik väljad'
        setTimeout(this.resetAlertMessage, 4000)
      }
    },


    sendPostUserProfileRequest() {
      console.log(this.userProfileInfo)
      this.$http.post("/user/register", this.userProfileInfo)
          .then(() => this.handlePostUserProfileInfoResponse())
          .catch(error => {
            console.log('e',error)
            router.push({name:'errorRoute'})
          })
    },
    handlePostUserProfileInfoResponse() {
      this.goToEventView()
      this.showSuccessMessage()
    },

    showSuccessMessage() {
      const alertParams = {
        style: 'alert-success',
        message: this.userProfileInfo.firstName + ', oled registreeritud ja võid sisse logida'
      }
      this.$emit('event-user-registered', alertParams)
    },

    getAndSetUserProfileValues() {
      this.userProfileInfo.username = this.$refs.profileInputComponentRef.username
      this.userProfileInfo.password = this.$refs.profileInputComponentRef.password
      this.userProfileInfo.firstName = this.$refs.profileInputComponentRef.firstName
      this.userProfileInfo.lastName = this.$refs.profileInputComponentRef.lastName
      this.userProfileInfo.birthDate = this.$refs.profileInputComponentRef.birthDate
      this.userProfileInfo.cityId = this.$refs.profileInputComponentRef.city
      this.userProfileInfo.genderId = this.$refs.profileInputComponentRef.genderId
      this.userProfileInfo.interestedIn = this.$refs.profileInputComponentRef.interestedIn
      this.userProfileInfo.introduction = this.$refs.profileInputComponentRef.introduction
      this.userProfileInfo.profileImage = this.$refs.profileInputComponentRef.profileImage
    },
    setCityId(city) {
      this.userProfileInfo.cityId = city
    },
    goToEventView() {
      router.push({name: 'indexRoute'})
    },
  }
}
</script>

