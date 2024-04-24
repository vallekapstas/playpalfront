<template>

  <div id="imageSelectionContainer">
    <div>
      <img v-if="profileImage.length > 0" :src="profileImage" class="img-thumbnail" alt="Profiili pilt">
      <img v-else src="@/assets/profile_image.png" class="img-thumbnail" alt="Profiili pilt">

    </div>


  </div>
</template>


<script>


export default {
  name: 'ProfileImageComponent',
  props: {
    profileImage: String
  }

}
</script>



