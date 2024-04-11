<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Üritused</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <EventComponent />
      </div>
    </div>
  </div>
  <p>LogInModal</p>
  <LogInModal/>
  <p>Modal</p>
  <Modal></Modal>
</template>

<script>
// @ is an alias to /src
import EventComponent from '@/components/event/EventComponent.vue'
import LogInModal from "@/components/modal/LogInModal.vue";
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'HomeView',
  components: {
    Modal,
    LogInModal,
    EventComponent
  }
}
</script>
