<template>
<Modal ref="modalRef" >
  <div class="container text-center">

        <div class="">
          <h1>Profiil</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>


        <div class="">
          <div class="row">
            Eesnimi:
            <input>
          </div>

          <div class="row">
            Riik:
          </div>

          <div class="row">
            Linn:
          </div>


        </div>


        <div class="">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tagasi</button>
          <button type="button" class="btn btn-primary">Salvesta muudatused</button>
        </div>



    </div>


</Modal>
</template>




<script>
import Modal from "@/components/modal/Modal.vue";
import ProfileImageComponent from "@/components/input/ProfileImageComponent.vue";

export default {
  name: "UserProfileComponent",
  components: {Modal, ProfileImageComponent},
  data() {
    return{
      userProfileInfo: [
        {
          firstName: '',
          countryId: 0,
          countryName:'',
          cityId: 0,
          cityName: '',
          birthDate: true,
          genderId: 0,
          genderName:''
        }
      ],



    }
  },
  methods:{

    getUserProfileInfosRequest () {
      this.this.$http.get('/profile')

    },




  }

}
</script>



