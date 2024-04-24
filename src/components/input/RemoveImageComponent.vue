<template>
  <div>

        <button  class="btn btn-outline-primary shadow-sm text-nowrap m-1" @click="clearImage">Eemalda
          pilt
        </button>

  </div>
</template>
<script>
export default {
  name: 'RemoveImageComponent',

  data() {
    return {
      profileImage: ''
    }
  },
  methods: {

    clearImage() {

      this.$emit('event-clear-image-file'); // Emit event with empty string to clear image on parent component
    },
  }
}
</script>