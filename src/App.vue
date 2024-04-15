<template>
  <AlertComponent ref="alertComponentRef"/>
  <LogInModal ref="logInModalRef"
              @event-user-logged-in="handleUserLoggedIn"
              @event-fill-all-fields-alert="displayAlert"
              @event-incorrect-credentials-alert="displayAlert"/>
  <LogOutModal ref="logOutModalRef"
               @event-user-logged-out="handleUserLoggedOut"/>
  <nav class="navbar navbar-expand-sm mb-3">
    <div class="container-fluid">
      <div class="col-2">
        <router-link to="/" class="navbar-brand">
          <img src="../src/assets/Playpal%20logo%20transparent.png" style="height: 3.5rem"/>
        </router-link>
      </div>

      <!-- REGULAR MENU -->
      <div class="collapse navbar-collapse" id="navMenu">

        <div class=" col-8 d-grid d-md-block fs-5">
          <router-link to="/events" class="nav-link">Üritused</router-link>
          <router-link to="/error" class="nav-link">Error</router-link>
        </div>

        <div class="col-2 d-grid d-md-block">
          <template v-if="isLoggedIn">
            <button @click="openLogoutModal" class="btn btn-sm btn-outline-dark shadow-sm text-nowrap m-1">Logi välja
            </button>
          </template>
          <template v-else>
            <a href="/register" class="btn btn-sm btn-outline-dark shadow-sm text-nowrap m-1">Registreeri</a>
            <button @click="openLogInModal" class="btn btn-sm btn-outline-dark shadow-sm text-nowrap m-1">Logi sisse
            </button>
          </template>
        </div>

      </div>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu"
              aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

    </div>
  </nav>
  <router-view @event-update-nav-menu="handleUserStatusUpdates"/>
</template>
<script>
import LogInModal from "@/components/modal/LogInModal.vue";
import AlertComponent from "@/components/alert/AlertComponent.vue";
import LogOutModal from "@/components/modal/LogOutModal.vue";

export default {
  components: {LogOutModal, AlertComponent, LogInModal},
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
    openLogoutModal() {
      this.$refs.logOutModalRef.$refs.modalRef.openModal()
    },

    handleUserLoggedIn() {
      this.handleUserStatusUpdates()

      this.alertParams.style = 'alert-success'
      this.alertParams.message = 'Oled sisse logitud'
      this.displayAlert(this.alertParams)
    },
    handleUserLoggedOut() {
      this.handleUserStatusUpdates()

      this.alertParams.style = 'alert-warning'
      this.alertParams.message = 'Oled välja logitud'
      this.displayAlert(this.alertParams)
    },
    handleUserStatusUpdates() {
      this.updateIsLoggedInValue()
      this.updateIsAdminValue()
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
    },
  },
  mounted() {
    this.handleUserStatusUpdates()
  }
}
</script>