<template>

  <Modal ref="modalRef">

    <div class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Profiili vaade</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>


          <template>
          <div class="modal-body">
            <ProfileView :user-id="userId"/>
          </div>
          </template>

          <template>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Sulge</button>
          </div>
          </template>

        </div>
      </div>
    </div>

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



