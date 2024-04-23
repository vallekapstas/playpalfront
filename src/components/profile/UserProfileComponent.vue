<template>

  <div class="container text-center">
    <div class="row">
      <div class="col">


        <div class="row">
          <div class="col text-end">
            Kasutajanimi:
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
            Asukoht:
          </div>
          <div class="col text-start font-monospace">
            {{ location }}
          </div>
        </div>


        <div class="row">
          <div class="col text-end">
            Sünnikuupäev:
          </div>
          <div class="col text-start font-monospace">
            {{ birthDateFormatted }}
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
        Profiili pilt:
        <ProfileImageComponent profile-image="Profile Image Component" />
      </div>


    </div>
  </div>


</template>


<script>

import ProfileImageComponent from "@/components/input/ProfileImageComponent.vue";


export default {
  name: 'UserProfileComponent',
  components: {ProfileImageComponent},

  props: ,
  computed: {
    fullName() {
      return this.profileData.firstName + ' ' + this.profileData.lastName
    },
    location() {
      return this.profileData.countryName + ', ' + this.profileData.countyName + ', ' + this.profileData.cityName + ''
    },
    birthDateFormatted() {
      return this.formatDate(this.profileData.birthDate)
    },
  },

  data() {
    return {
      profileData: {
        username: '',
        firstName: '',
        lastName:'',
        countryName: '',
        countyName:'',
        cityName: '',
        birthDate: '',
        genderName: '',
        interestedIn: '',
        introduction: '',
        imageData: ''
      }

    }
  },
methods:{
  formatDate(inputDate) {
    // Parse the input date string
    const parts = inputDate.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    // Create a new Date object
    const date = new Date(year, month - 1, day);

    // Get the day, month, and year components from the Date object
    const formattedDay = String(date.getDate()).padStart(2, '0');
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedYear = date.getFullYear();

    // Return the reformatted date string
    return `${formattedDay}.${formattedMonth}.${formattedYear}`;
  },
}
}
</script>



