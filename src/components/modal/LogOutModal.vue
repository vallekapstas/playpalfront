<template>
  <Modal ref="modalRef">
    <template #title>
      Kas soovid välja logida?
    </template>
    <template #buttons>
      <button @click="executeLogOut" type="button" class="btn btn-outline-success">Jah</button>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
  name: "LogOutModal",
  components: {Modal},
  methods: {
    executeLogOut() {
      sessionStorage.clear()
      this.$emit('event-user-logged-out')
      this.$refs.modalRef.closeModal()
      router.push({name: 'indexRoute'})
    }
  }
}
</script>


