<template>

  <AlertComponent ref="alertComponentRef"/>
  <LogInModal ref="logInModalRef"
              @event-user-logged-in="handleUserLoggedIn"
              @event-fill-all-fields-alert="displayAlert"
              @event-incorrect-credentials-alert="displayAlert"/>
  <LogOutModal ref="logOutModalRef"
               @event-user-logged-out="handleUserLoggedOut"/>
  <nav class="navbar navbar-expand-sm mb-5">
    <div class="container-fluid">
      <div class="col-2 justify-content-start">
        <router-link to="/" @click="handleRouteClick('/')" class="navbar-brand">
          <img src="../src/assets/playpal_logo_transparent.png" style="height: 4.5rem"/>
        </router-link>
      </div>

      <div class="collapse navbar-collapse justify-content-center col-8 fs-4" id="navMenu">
        <template v-if="isLoggedIn">
          <router-link to="/myevents" @click="handleRouteClick('/myevents')" class="nav-link">Minu üritused
          </router-link>
          <router-link to="/profile" @click="handleRouteClick('/profile')" class="nav-link">Profiil</router-link>
        </template>
        <template v-if="isAdmin">
          <router-link to="/manage" @click="handleRouteClick('/manage')" class="nav-link">Halda</router-link>
        </template>
      </div>

      <div class="collapse navbar-collapse justify-content-end col-2" id="navMenu">
        <template v-if="isLoggedIn">
          <button @click="openLogoutModal" class="btn btn-outline-primary shadow-sm text-nowrap m-1">
            Logi välja
          </button>
        </template>
        <template v-else>
          <button @click="goToRegisterView" class="btn btn-outline-primary shadow-sm text-nowrap m-1">Registreeri
          </button>
          <button @click="openLogInModal" class="btn btn-outline-primary shadow-sm text-nowrap m-1">
            Logi sisse
          </button>
        </template>
      </div>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu"
              aria-controls="navMenu" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

    </div>
  </nav>
  <router-view @event-update-nav-menu="handleUserStatusUpdates"
               @event-user-registered="handleUserRegistered"
               @event-user-joined-event="handleUserJoinedEvent"
               @event-user-left-event="handleUserLeftEvent"/>
</template>
<script>
import LogInModal from "@/components/modal/LogInModal.vue";
import AlertComponent from "@/components/alert/AlertComponent.vue";
import LogOutModal from "@/components/modal/LogOutModal.vue";
import router from "@/router";
import ParticipationLabelComponent from "@/components/event/ParticipationLabelComponent.vue";

export default {
  components: {ParticipationLabelComponent, LogOutModal, AlertComponent, LogInModal},
  data() {
    return {
      showMobileMenu: false,
      isLoggedIn: false,
      isAdmin: false,

      alertParams: {
        style: '',
        message: ''
      },

      routeKey: 0
    }
  },
  methods: {

    openLogInModal() {
      this.$refs.logInModalRef.$refs.modalRef.openModal()
    },

    openLogoutModal() {
      this.$refs.logOutModalRef.$refs.modalRef.openModal()
    },

    goToRegisterView() {
      router.push({name: 'registerRoute'})
    },

    async handleUserLoggedIn() {
      await this.handleUserStatusUpdates()
      await this.displayLogInSuccessAlert()
      setTimeout(this.reloadApp, 100)
    },

    async handleUserLoggedOut() {
      await this.resetUserStatuses()
      await this.displayLogOutWarningAlert()
      setTimeout(this.reloadApp, 100)
    },

    async handleUserJoinedEvent() {
      await this.displayUserJoinedEventAlert()
      setTimeout(this.reloadApp, 100)
    },

    async handleUserLeftEvent() {
      await this.displayUserLeftEventAlert()
      setTimeout(this.reloadApp, 100)
    },

    displayLogInSuccessAlert() {
      this.alertParams.style = 'alert-success'
      this.alertParams.message = 'Oled sisse logitud'
      this.displayAlert(this.alertParams)
    },

    displayLogOutWarningAlert() {
      this.alertParams.style = 'alert-warning'
      this.alertParams.message = 'Oled välja logitud'
      this.displayAlert(this.alertParams)
    },

    displayUserJoinedEventAlert() {
      this.alertParams.style = 'alert-success'
      this.alertParams.message = 'Sinu soov üritusega liituda on edastatud'
      this.displayAlert(this.alertParams)
    },

    displayUserLeftEventAlert() {
      this.alertParams.style = 'alert-warning'
      this.alertParams.message = 'Oled ürituse nimekirjast eemaldatud'
      this.displayAlert(this.alertParams)
    },

    reloadApp() {
      window.location.reload();
    },

    handleUserStatusUpdates() {
      this.updateIsLoggedInValue()
      this.updateIsAdminValue()
    },

    resetUserStatuses() {
      this.isLoggedIn = false
      this.isAdmin = false
    },

    updateIsLoggedInValue() {
      const userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null
    },

    updateIsAdminValue() {
      if (this.isLoggedIn) {
        const roleId = sessionStorage.getItem('roleId')
        this.isAdmin = roleId === '1'
      }
    },

    async handleUserRegistered(alertParams) {
      await this.openLogInModal()
      this.displayAlert(alertParams)
    },

    displayAlert(alertParams) {
      this.$refs.alertComponentRef.displayAlert(alertParams)
    },

    handleRouteClick(route) {
      if (this.$route.path === route) {
        this.routeKey++;
      }
    }

  },
  mounted() {
    this.handleUserStatusUpdates()
  }
}
</script>