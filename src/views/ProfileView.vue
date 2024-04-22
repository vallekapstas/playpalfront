<template>
  <div class="container text-center">

    <div class="row">
      <div class="col">
        <h1>Profiil</h1>
        <UserProfileComponent :propName="UserProfileComponent"/>
      </div>
    </div>

    <div class="row">
      <div class="col">
<!--        <ProfileInputComponent ref="profileInputComponentRef" @event-new-image-file-selected="setProfileImage"/>-->
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


import router from "@/router";
import UserProfileComponent from "@/components/input/UserProfileComponent.vue";
import ProfileInputComponent from "@/components/input/ProfileInputComponent.vue";

export default {
  name: 'ProfileView',
  components: {ProfileInputComponent, UserProfileComponent},
  data() {
    return{
      UserProfileComponent
    }
  },

methods: {
  setProfileImage(profileImage) {
    this.userProfileInfo.profileImage = profileImage
  },
}
}
</script>


