<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Üritused</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-10">
        <EventComponent :eventId="1"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventComponent from '@/components/event/EventComponent.vue'

export default {
  name: 'HomeView',
  components: {
    EventComponent
  }
}
</script>
