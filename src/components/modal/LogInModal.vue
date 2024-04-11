<template>

  <Modal ref="modalRef">
    <template #title>
      Kas soovid sisse logida?
    </template>

    <template #body>
      <div class="container text-start">
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="username" class="form-label">Kasutajanimi</label>
              <input v-model="username" type="text" class="form-control" id="username">
            </div>

            <div>
              <label for="password"  class="form-label">Parool</label>
              <input v-model="password" type="password" class="form-control" id="password">
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #buttons>
      <button type="button" class="btn btn-success" @click="executeLogIn">Logi sisse</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
  name: "LogInModal",
  components: {Modal},
  data() {
    return {
      username: '',
      password: '',
      loginResponse: {
        userId: 0,
        roleName: '',
        roleId: 0
      }
    }
  },
  methods: {
    executeLogIn() {
      if (this.allFieldsWithCorrectInput()) {
        this.sendLoginRequest()
      } else {
        alert('täida kõik väljad')
      }
    },

    allFieldsWithCorrectInput() {
      return this.username.length > 0 && this.password.length > 0
    },

    sendLoginRequest() {
      this.$http.get('/login', {
            params: {
              username: this.username,
              password: this.password
            }
          }
      ).then(response => {
        this.loginResponse = response.data
        this.handleLoginRequestResponse()
      }).catch(error => {
        const errorResponseJSON = error.response.data
      })
    },

    handleLoginRequestResponse() {
      this.saveLoginResponseInfoToSessionStorage()
      this.$emit('user-logged-in')
      this.resetAllInputFields()
      this.$refs.modalRef.closeModal()
      router.push({name: 'indexRoute'})
    },

    saveLoginResponseInfoToSessionStorage() {
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      sessionStorage.setItem('roleId', this.loginResponse.roleId)
    },

    resetAllInputFields() {
      this.username = ''
      this.password = ''
    },
  }
}
</script>