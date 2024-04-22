<template>
  <Modal ref="modalRef" :modal-bg-color="'playpal-bg'" :modal-extra-classes="'modal-logout'">
    <template #title>
      Logi välja?
    </template>
    <template #buttons>
      <button @click="executeLogOut" type="submit" class="btn btn-primary">Jah</button>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
  name: 'LogOutModal',
  components: {Modal},

  mounted() {
    document.addEventListener('keydown', this.handleEnterKeyDown);
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEnterKeyDown);
  },

  methods: {
    executeLogOut() {
      sessionStorage.clear()
      this.$emit('event-user-logged-out')
      this.$refs.modalRef.closeModal()
      router.push({name: 'indexRoute'})
    },

    handleEnterKeyDown(event) {
      if (event.key === 'Enter' && this.$refs.modalRef.isOpen) {
        this.executeLogOut();
      }
    },

  }
}
</script>


