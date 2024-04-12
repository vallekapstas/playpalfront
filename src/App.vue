<template>
  <AlertComponent ref="alertComponentRef"/>
  <LogInModal ref="logInModalRef"
              @event-user-logged-in="handleUserLoggedIn"
              @event-fill-all-fields-alert="displayAlert"
              @event-incorrect-credentials-alert="displayAlert"/>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
    <div class="container-fluid">
      <div class="text-light">
        <router-link to="/" class="nav-link" aria-current="page">PlayPal</router-link>
      </div>

      <div class="collapse navbar-collapse justify-content-md-center">
        <router-link to="/events" class="nav-link" aria-current="page">Üritused</router-link>
      </div>

      <router-link v-if="isLoggedIn" to="/logout" class="nav-link" @click="">Logi välja</router-link>
      <router-link v-else to="/login" class="nav-link" @click="openLogInModal">Logi sisse</router-link>

    </div>
  </nav>

  <router-view/>
</template>

<script>
import LogInModal from "@/components/modal/LogInModal.vue";
import AlertComponent from "@/components/alert/AlertComponent.vue";

export default {
  components: {AlertComponent, LogInModal},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      alertParams: {
        style: '',
        message: ''
      }
    }
  },
  methods: {
    openLogInModal() {
      this.$refs.logInModalRef.$refs.modalRef.openModal()
    },

    handleUserLoggedIn() {
      this.updateIsLoggedInValue()
      this.updateIsAdminValue()

      this.alertParams.style = 'alert-success'
      this.alertParams.message = 'Oled sisse logitud'
      this.displayAlert(this.alertParams)
    },

    updateIsLoggedInValue() {
      const userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null
    },

    updateIsAdminValue() {
      if (this.isLoggedIn) {
        const roleId = sessionStorage.getItem('roleId')
        this.isAdmin = roleId === '2'
      }
    },

    displayAlert(alertParams) {
      this.$refs.alertComponentRef.displayAlert(alertParams)
    }
  }
}
</script>