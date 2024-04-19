<template>

  <div id="imageSelectionContainer">
    <div>
      <img v-if="profileImage" :src="profileImage" class="img-thumbnail" alt="Profiili pilt" style="width: 200px; height: 200px;">
      <input ref="fileInputRef" type="file" class="form-control" @change="handleImage" accept="image/jpeg,image/x-png,image/gif">
    </div>
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
      this.emitNewProfileImage(selectedImage);
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
  }
}
</script>



