<template>

  <div>
    <img v-if="eventImage === ''" class="img-fluid" src="../../assets/red_dice.png" alt="Ürituse pilt"/>
    <img v-else class="img-fluid" :src="eventImage" alt="Ürituse pilt"/>
  </div>

</template>


<script>

export default {
  name: "EventImageComponent",
  props: {
    eventImage: String,
  }
}

</script>