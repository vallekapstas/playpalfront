<template>

  <div id="imageSelectionContainer">
    <div>
      <img v-if="profileImage" :src="profileImage" class="img-thumbnail" alt="Profiili pilt" style="width: 200px; height: 200px;">
      <input ref="fileInputRef" type="file" class="form-control" @change="handleImage" accept="image/jpeg,image/x-png,image/gif">
    </div>
    <button v-if="profileImage" class="btn btn-outline-primary shadow-sm text-nowrap m-1" @click="clearImage">eemalda pilt</button>
  </div>
</template>


<script>
export default {
  name: "ProfileImageComponent",
  props:{
    profileImage: String
  },
  data() {
    return {
      profileImage: ''
    }
  },
  methods: {
    handleImage(event) {
      const selectedImage = event.target.files [0];
      if (selectedImage) {
        this.emitNewProfileImage(selectedImage);
      }
    },
    emitNewProfileImage(fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
        this.$emit('event-new-image-file-selected', this.profileImage)
      }
      reader.onerror = function (error) {
        alert(error);
      }
      reader.readAsDataURL(fileObject);
    },
    clearImage() {
      this.profileImage = ''; // Clear the profile image
      this.$refs.fileInputRef.value = ''; // Clear the file input value
      this.$emit('event-new-image-file-selected', ''); // Emit event with empty string to clear image on parent component
    },
  }
}
</script>



