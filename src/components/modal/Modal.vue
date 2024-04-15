<template>
  <div v-if="isOpen" class="modal-backdrop"/>
  <div v-if="isOpen" class="modal" tabindex="-1" style="display: block;" ref="modalRef">
    <div :class="'modal-dialog ' + modalExtraClasses">
      <div :class="'modal-content ' + modalBgColor">
        <div class="modal-header border-0">
          <h1 class="modal-title fs-5">
            <slot name="title">
              <!-- Title -->
            </slot>
          </h1>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <slot name="body">
            <!-- Body-->
          </slot>
        </div>
        <div class="modal-footer border-0 justify-content-center">
          <button type="button" class="btn btn-dark shadow-sm" @click="closeModal">Sulge</button>
          <slot name="buttons">
            <!-- Button-->
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    modalBgColor: '',
    modalExtraClasses: ''
  },

  data() {
    return {
      isOpen: false,
      useEnterForCloseButton: false
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