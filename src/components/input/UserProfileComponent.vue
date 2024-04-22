<template>

  <div class="container bg-light border border-2 border-primary rounded-2 py-3 px-4 m-4 shadow-sm mx-auto">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Profiil</h5>

        </div>
        <div class="modal-body">
          <p>Nimi</p>
        </div>

        <div class="modal-body">
          <p>Riik</p>
        </div>

        <div class="modal-body">
          <p>Sünnikuupäev</p>
        </div>

        <div class="modal-body">
          <p>Sugu</p>
        </div>

        <div class="modal-body">
          <p>Lemmikmängud</p>
        </div>

        <div class="modal-body">
          <p>Enesetutvustus</p>
        </div>


        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Sulge</button>
          <button type="button" class="btn btn-primary">Salvesta</button>
        </div>
      </div>
    </div>
  </div>


</template>




<script>

import ProfileImageComponent from "@/components/input/ProfileImageComponent.vue";

export default {
  name: 'UserProfileComponent',
  components: {ProfileImageComponent},
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


  }

}
</script>



