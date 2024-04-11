<template>
  <div v-if="isOpen" class="modal-backdrop fade show d-block"/>
  <div v-if="isOpen" class="modal fade show" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" >Logi sisse</h1>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',

  data() {
    return {
      isOpen: false
    }
  },

  methods: {
    openModal() {
      this.isOpen = true
    },

    closeModal() {
      this.isOpen = false
    }
  }

}
</script>