<template>

  <Modal ref="modalRef">

    <ProfileView :user-id="userId"/>

  </Modal>


</template>


<script>
import Modal from "@/components/modal/Modal.vue";
import ProfileView from "@/views/ProfileView.vue";

export default {
  name: 'ProfilePreviewModal',
  components: {ProfileView, Modal},

  props: {
    userId: Number(sessionStorage.getItem('userId'))
  },

  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      profileData: {
        username: '',
        roleId: 0,
        genderId: 0,
        genderName: '',
        countryId: 0,
        countyId: 0,
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

      }

    }
  },
  methods: {
    getUserInfo() {
      this.$http.get(`/user/${this.userId}`)
          .then(response => {
            this.profileData = response.data
          })
          .catch(error => {
            const errorResponseJSON = error.response.data
          })
    },

  },
  mounted() {
    this.getUserInfo()
  }
}
</script>



