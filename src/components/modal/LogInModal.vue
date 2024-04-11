<template>

  <Modal ref="modalRef">
    <template #title>
      Kas soovid sisse logida?
    </template>

    <template #body>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            SISU
          </div>
        </div>
      </div>
    </template>

    <template #buttons>
      <button type="button" class="btn btn-success">Logi sisse</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: "LogInModal",
  components: {Modal}
}
</script>