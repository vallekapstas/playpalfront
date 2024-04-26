<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Üritused</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-10">
        <EventFilterComponent @event-get-sorted-and-filtered-events="doSomething"/>
        <EventComponent v-for="event in this.events" :key="event.eventId" ref="eventComponentRef"
                        :event-id="event.eventId"
                        @event-user-joined-event="this.$emit('event-user-joined-event')"
                        @event-user-left-event="this.$emit('event-user-left-event')"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventComponent from '@/components/event/EventComponent.vue'
import EventFilterComponent from "@/components/event/EventFilterComponent.vue";

export default {
  name: 'HomeView',
  components: {
    EventFilterComponent,
    EventComponent
  },

  data() {
    return {
      events: [
        {eventId: 1}, {eventId: 2}, {eventId: 3}, {eventId: 4}, {eventId: 5}, {eventId: 6}, {eventId: 7}
      ]
    }
  },

  methods: {
    doSomething() {
      alert('GET Events')
    }
  }
}
</script>
