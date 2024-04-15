<template>
  <!-- Modal -->
  <div v-if="isOpen" class="modal-backdrop"/>
  <div v-if="isOpen" class="modal" tabindex="-1" style="display: block;" ref="modalRef" @focusin.prevent.stop="">>
    <div :class="'modal-dialog ' + modalExtraClasses">
      <div :class="'modal-content ' + modalBgColor">
        <div class="modal-header border-0">
          <h1 class="modal-title fs-5">
            <slot name="title">
              <!-- Title -->
            </slot>
          </h1>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal" tabindex="0"></button>
        </div>
        <div class="modal-body">
          <slot name="body">
            <!-- Body-->
          </slot>
        </div>
        <div class="modal-footer border-0 justify-content-center">
          <button type="button" class="btn btn-dark shadow-sm" @click="closeModal" tabindex="0">Sulge</button>
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
      this.$emit('event-open-modal');
      this.isOpen = true;
      this.$nextTick(() => {
        this.$refs.modalRef.focus();
      });
      window.addEventListener('keydown', this.onKeyPress);
      document.activeElement.blur();
    },

    closeModal() {
      this.$emit('event-close-modal');
      this.isOpen = false;
      window.removeEventListener('keydown', this.onKeyPress);
    },

    onKeyPress(event) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.closeModal();
      }
      if (this.useEnterForCloseButton && event.key === 'Enter') {
        this.closeModal();
      }
      if (event.key === 'Tab' && !event.shiftKey) {
        this.$nextTick(() => {
          // Tab key pressed, and it's not shift + tab
          const modalDialog = this.$refs.modalRef;
          if (modalDialog) {
            const focusableElements = modalDialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const lastElement = focusableElements[focusableElements.length - 1];
            const firstElement = focusableElements[0];
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        });
      }
    }

  }

}
</script>