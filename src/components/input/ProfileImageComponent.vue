<template>

  <div>
    <input ref="fileInputRef" type="file" class="form-control" @change="handleImage"
           accept="image/jpeg,image/x-png,image/gif">
    <img v-if="imageData=== ''" src="src/assets/profileimage.png" class="img-thumbnail" alt="Vaikimisi profiili pilt">
    <img :src="imageData" class="img-thumbnail" alt="Profiili pilt">
  </div>

</template>


<script>
export default {
  name: "ProfileImageComponent",
  props:{
    imageData: String
  },
  data() {
    return {
      imageData: String
    }
  },
  methods: {
    handleImage(event) {
      const selectedImage = event.target.files [0];
      this.emitNewImageData(selectedImage);
    },
    emitNewImageData(fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result;
        this.$emit('event-new-image-file-selected', this.imageData)
      }
      reader.onerror = function (error) {
        alert(error);
      }
      reader.readAsDataURL(fileObject);
    },
  }
}
</script>



