<template>
  <div v-if="alertDisplay" :class="'alert alert-style fs-5 w-50 fw-bold shadow px-5 py-2 ' + alertParams.style" role="alert">
    {{ alertParams.message }}
  </div>
</template>

<script>
export default {
  name: 'AlertComponent',

  data() {
    return {
      alertDisplay: false,
      alertParams: {
        style: '',
        message: ''
      }
    }
  },

  methods: {
    displayAlert(alertParams) {
      this.setAlertStyleAndMessage(alertParams)
      this.setAlertDisplayTrue()
      setTimeout(this.handleAlertDisplayEnd, 3000)
    },

    setAlertStyleAndMessage(alertParams) {
      this.alertParams.style = alertParams.style
      this.alertParams.message = alertParams.message
    },

    setAlertDisplayTrue() {
      this.alertDisplay = true
    },

    handleAlertDisplayEnd() {
      this.setAlertDisplayFalse()
      this.resetAlertDisplayData()
    },

    setAlertDisplayFalse() {
      this.alertDisplay = false
    },

    resetAlertDisplayData() {
      this.alertParams.style = ''
      this.alertParams.message = ''
    }

  }
}

</script>