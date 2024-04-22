<template>
  <div class="container bg-light border border-2 border-primary rounded-2 py-3 px-4 m-4 shadow-sm mx-auto">

    <div class="row text-center">
      <div class="col mb-4">
        <h1>Registreeri kasutajaks</h1>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <ProfileInputComponent ref="profileInputComponentRef" @event-new-image-file-selected="setProfileImage"/>
      </div>
    </div>

    <div class="row d-grid justify-content-center">
      <div class="col d-flex gap-3 mt-5 mb-2">
        <button class="btn btn-dark shadow-sm" type="submit" @click="goToEventView">Tagasi</button>
        <button class="btn btn-primary shadow-sm" type="button" @click="addUserProfile">Registreeri</button>
      </div>
    </div>

  </div>
</template>

<script>
import LocationDropdownsComponent from "@/components/input/LocationDropdownsComponent.vue";
import ProfileInputComponent from "@/components/input/ProfileInputComponent.vue";
import router from "@/router";

export default {
  name: 'RegisterView',
  components: {ProfileInputComponent, LocationDropdownsComponent},

  data() {
    return {
      successMessage: '',
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
      }
    },

    sendPostUserProfileRequest() {
      this.$http.post("/user/register", this.userProfileInfo)
          .then(() => this.handlePostUserProfileInfoResponse())
          .catch(() => {
            router.push({name: 'errorRoute'})
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

    setProfileImage(profileImage) {
      this.userProfileInfo.profileImage = profileImage
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
    },
    goToEventView() {
      router.push({name: 'indexRoute'})
    },
  }
}
</script>

