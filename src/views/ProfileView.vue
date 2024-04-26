<template>
  <div class="container bg-light border border-2 border-primary rounded-2 py-3 px-4 m-4 shadow-sm mx-auto">

    <div class="row">
      <div class="col">
        <h1>Profiil</h1>
        <UserProfileComponent/>
      </div>
    </div>


    <div class="row d-grid justify-content-center">
      <div class="col d-flex gap-3 mt-5 mb-2">
        <button class="btn btn-dark shadow-sm" type="submit" @click="goToIndexRoute">Tagasi</button>
        <button class="btn btn-primary shadow-sm" type="button" @click="navigateToEditProfile">Muuda</button>

      </div>
    </div>

  </div>


</template>


<script>


import router from "@/router";
import UserProfileComponent from "@/components/profile/UserProfileComponent.vue";
import ProfileInputComponent from "@/components/input/ProfileInputComponent.vue";

export default {
  name: 'ProfileView',
  components: {ProfileInputComponent, UserProfileComponent},
  computed: {UserProfileComponent},

  data() {
    return {


      userId: ''


    }
  },
  methods: {
    goToIndexRoute() {
      router.push({name: 'indexRoute'})

    },
    navigateToEditProfile() {

      router.push({ name: 'editProfileView' })
    },




  }

}
</script>


