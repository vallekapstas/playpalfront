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
              <label for="password" class="form-label">Parool</label>
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
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {
    executeLogIn() {
      if (this.allFieldsWithCorrectInput()) {
        this.sendLoginRequest()
      } else {
        this.displayFillAllFieldsAlert()
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
        this.errorResponse = error.response.data
        this.handleError(error.response.status)
      })
    },

    handleLoginRequestResponse() {
      this.saveLoginResponseInfoToSessionStorage()
      this.$emit('event-user-logged-in')
      this.resetAllInputFields()
      this.$refs.modalRef.closeModal()
      router.push({name: 'indexRoute'})
    },

    saveLoginResponseInfoToSessionStorage() {
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      sessionStorage.setItem('roleId', this.loginResponse.roleId)
    },

    handleError(statusCode) {
      this.handleIncorrectCredentialsError(statusCode)
      this.handleSomethingWentWrongError()
    },

    handleIncorrectCredentialsError(statusCode) {
      let incorrectCredentials = false
      incorrectCredentials = statusCode === 403 && this.errorResponse.errorCode === 403001

      if (incorrectCredentials) {
        this.displayIncorrectCredentialsAlert(this.errorResponse.message)
      }
    },

    handleSomethingWentWrongError() {
      if (403001 !== this.errorResponse.errorCode) {
        router.push({name: 'errorRoute'})
      }
    },

    resetAllInputFields() {
      this.username = ''
      this.password = ''
    },

    displayFillAllFieldsAlert() {
      const alertParams = {
        style: 'alert-danger',
        message: 'Täida kõik väljad'
      }
      this.$emit('event-fill-all-fields-alert', alertParams)
    },

    displayIncorrectCredentialsAlert(errorMessage) {
      const alertParams = {
        style: 'alert-danger',
        message: errorMessage
      }
      this.$emit('event-incorrect-credentials-alert', alertParams)
    }

  }
}
</script>