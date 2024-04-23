<template>

  <div class="container text-center">
    <div class="row">
      <div class="col">


        <div class="row">
          <div class="col text-end">
            Kasutajanimi
          </div>
          <div class="col text-start font-monospace">
            {{ this.profileData.username }}
          </div>
        </div>

        <div class="row">
          <div class="col text-end">
            Nimi:
          </div>
          <div class="col text-start font-monospace">
            {{ fullName }}
          </div>
        </div>

        <div class="row">
          <div class="col text-end">
            Riik:
          </div>
          <div class="col text-start font-monospace">
            {{ this.profileData.countryName }}
          </div>
        </div>

        <div class="row">
          <div class="col text-end">
            Linn:
          </div>
          <div class="col text-start font-monospace">
            {{ this.profileData.cityName }}
          </div>
        </div>

        <div class="row">
          <div class="col text-end">
            Sünnikuupäev:
          </div>
          <div class="col text-start font-monospace">
            {{ this.profileData.birthDate }}
          </div>
        </div>

        <div class="row">
          <div class="col text-end">
            Sugu:
          </div>
          <div class="col text-start font-monospace">
            {{ this.profileData.genderName }}
          </div>
        </div>

        <div class="row">
          <div class="col text-end">
            Lemmikmängud:
          </div>
          <div class="col text-start font-monospace">
            {{ this.profileData.interestedIn }}
          </div>
        </div>

        <div class="row">
          <div class="col text-end">
            Enesetutvustus:
          </div>
          <div class="col text-start font-monospace">
            {{ this.profileData.introduction }}
          </div>
        </div>

      </div>

      <div class="col">
        {{ this.profileData.imageData }}
      </div>


    </div>
  </div>


</template>


<script>

import ProfileImageComponent from "@/components/input/ProfileImageComponent.vue";

export default {
  name: 'UserProfileComponent',
  components: {ProfileImageComponent},

  computed: {
    fullName() {
      return ''
    },
  },

  data() {
    return {
      profileData: {
        username: '',
        countryName: '',
        cityName: '',
        birthDate: '',
        genderName: '',
        interestedIn: '',
        introduction: '',
        imageData: ''
      }

    }
  }

}
</script>



