<template>

  <div class="container text-center">
    <div class="row">
      <div class="col">


        <div class="row">
          <div class="col text-end">
            <label for="firstName" class="form-label text-primary fw-lighter"><b>Kasutajanimi:</b></label>
          </div>
          <div class="col text-start font-monospace">
            {{ this.profileData.username }}
          </div>
        </div>

        <div class="row">
          <div class="col text-end">
            <label for="firstName" class="form-label text-primary fw-lighter"><b>Nimi:</b></label>
          </div>
          <div class="col text-start font-monospace">
            {{ fullName }}
          </div>
        </div>

        <div class="row">
          <div class="col text-end">
            <label for="firstName" class="form-label text-primary fw-lighter"><b>Asukoht:</b></label>
          </div>
          <div class="col text-start font-monospace">
            {{ location }}
          </div>
        </div>


        <div class="row">
          <div class="col text-end">
            <label for="firstName" class="form-label text-primary fw-lighter"><b>Sünnikuupäev:</b></label>
          </div>
          <div class="col text-start font-monospace">
            {{ birthDateFormatted }}
          </div>
        </div>

        <div class="row">
          <div class="col text-end">
            <label for="firstName" class="form-label text-primary fw-lighter"><b>Sugu:</b></label>
          </div>
          <div class="col text-start font-monospace">
            {{ profileData.genderName }}
          </div>
        </div>

        <div class="row">
          <div class="col text-end">
            <label for="firstName" class="form-label text-primary fw-lighter"><b>Lemmikmängud:</b></label>
          </div>
          <div class="col text-start font-monospace">
            {{ profileData.interestedIn }}
          </div>
        </div>

        <div class="row">
          <div class="col text-end">
            <label for="firstName" class="form-label text-primary fw-lighter"><b>Enesetutvustus:</b></label>
          </div>
          <div class="col text-start font-monospace">
            {{ profileData.introduction }}
          </div>
        </div>

        <div class="row">
          <div class="col text-end">
            <label for="firstName" class="form-label text-primary fw-lighter"><b>Üritustel osalemisi:</b></label>
          </div>
          <div class="col text-start font-monospace">
            {{ eventCountInfo.eventCount }}
          </div>
        </div>

      </div>

      <div class="col">
        <label for="firstName" class="form-label text-primary fw-lighter"><b>Profiili pilt:</b></label>
        <ProfileImageComponent :profile-image="profileData.imageData"/>
      </div>


    </div>
  </div>


</template>


<script>

import ProfileImageComponent from "@/components/input/ProfileImageComponent.vue";


export default {
  name: 'UserProfileComponent',
  components: {ProfileImageComponent},

  props: {
    userId: Number
  },
  data() {
    return {

      profileData: {
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
      eventCountInfo: {
        userId: 0,
        eventCount: 0

      }


    }
  },

  computed: {
    fullName() {
      return this.profileData.firstName + ' ' + this.profileData.lastName
    },
    location() {
      return this.profileData.countryName + ', ' + this.profileData.countyName + ', ' + this.profileData.cityName + ''
    },
    birthDateFormatted(birthDate) {
      return this.formatDate(this.profileData.birthDate)
    },
  },


  methods: {

    getUserProfile() {
      this.$http.get(`/user/${this.userId}`)
          .then(response => {
            this.profileData = response.data
          })
          .catch(error => {
            const errorResponseJSON = error.response.data
          })
    },
    getEventCountByUserId() {
      this.$http.get(`/user/${this.userId}/eventcount`)
          .then(response => {
            this.eventCountInfo = response.data
          })
          .catch(error => {
            const errorResponseJSON = error.response.data
          })
    },
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
    }
  },


  mounted() {
    this.getUserProfile()
    this.getEventCountByUserId()
  }
}
</script>



