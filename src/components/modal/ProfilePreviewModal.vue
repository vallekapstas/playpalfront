<template>

  <Modal ref="modalRef">

    <ProfileView/>

  </Modal>


</template>


<script>
import Modal from "@/components/modal/Modal.vue";
import ProfileView from "@/views/ProfileView.vue";

export default {
  name: "ProfilePreviewModal",
  components: {ProfileView, Modal}
}
</script>



