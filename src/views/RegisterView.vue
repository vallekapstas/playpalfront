
<template>

  <div class="container text-center">
    <div class="row">
      <div class="col-11" style="margin-bottom: 50px;">
        <h1>Registreeri</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <ProfileInputComponent/>
      </div>
    </div>
  </div>


</template>

<script>
import LocationDropdownsComponent from "@/components/input/LocationDropdownsComponent.vue";
import ProfileInputComponent from "@/components/input/ProfileInputComponent.vue";

export default {
  name: "RegisterView",
  components: {ProfileInputComponent, LocationDropdownsComponent}
}
</script>

