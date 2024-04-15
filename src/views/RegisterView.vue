
<template>

  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Registreeri</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <LocationDropdownsComponent/>
      </div>
    </div>
  </div>


</template>

<script>
import LocationDropdownsComponent from "@/components/input/LocationDropdownsComponent.vue";

export default {
  name: "RegisterView",
  components: {LocationDropdownsComponent}
}
</script>

