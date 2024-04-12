<template>
<!-- todo: alert component and implementation for logging in -->
  <LogInModal ref="logInModalRef" @event-user-logged-in="handleUserLoggedIn"/>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
    <div class="container-fluid">
      <div class="text-light">PlayPal</div>

      <div class="collapse navbar-collapse justify-content-md-center">
        <router-link to="/" class="nav-link" aria-current="page">Üritused</router-link>
      </div>

      <router-link v-if="isLoggedIn" to="/logout" class="nav-link" @click="">Logi välja</router-link>
      <router-link v-else to="/login" class="nav-link" @click="openLogInModal">Logi sisse</router-link>

    </div>
  </nav>

  <router-view/>
</template>

<script>
import LogInModal from "@/components/modal/LogInModal.vue";

export default {
  components: {LogInModal},
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
      // todo: activate component
      alert(alertParams.message)
    }
  }
}
</script>