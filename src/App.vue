<template>
  <LogInModal ref="logInModalRef"/>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5" aria-label="Tenth navbar example">
    <div class="container-fluid">
      <div class="text-light">PlayPal</div>

      <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
        <router-link to="/" class="nav-link" aria-current="page">Üritused</router-link>
      </div>


      <router-link to="/login" class="nav-link" @click="openLogInModal">Logi sisse</router-link>
    </div>
  </nav>

  <router-view/>
</template>

<script>
import LogInModal from "@/components/modal/LogInModal.vue";

export default {
  components: {LogInModal},
  methods: {
    openLogInModal() {
      this.$refs.logInModalRef.$refs.modalRef.openModal()
    },
  }
}
</script>