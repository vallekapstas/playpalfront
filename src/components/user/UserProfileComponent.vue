<template>
<Modal>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">


        <div class="modal-header">
          <h5 class="modal-title">Profiil</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>


        <div class="modal-body">
          <div class="row">
            Nimi:
          </div>

          <div class="row">
            Riik:
          </div>

          <div class="row">
            Linn:
          </div>


        </div>


        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tagasi</button>
          <button type="button" class="btn btn-primary">Salvesta muudatused</button>
        </div>


      </div>
    </div>
  </div>

</Modal>
</template>




<script>
import Modal from "@/components/modal/Modal.vue";
import ProfileImageComponent from "@/components/input/ProfileImageComponent.vue";

export default {
  name: "UserProfileComponent",
  components: {Modal, ProfileImageComponent},

}
</script>



