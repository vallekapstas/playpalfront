<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Üritused</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-10">
        <EventFilterComponent/>
        <EventComponent ref="eventComponentRef" :eventId="1"
                        @event-user-joined-event="this.$emit('event-user-joined-event')"
                        @event-user-left-event="this.$emit('event-user-left-event')"/>
        <EventComponent ref="eventComponentRef" :eventId="2"
                        @event-user-joined-event="this.$emit('event-user-joined-event')"
                        @event-user-left-event="this.$emit('event-user-left-event')"/>
        <EventComponent ref="eventComponentRef" :eventId="3"
                        @event-user-joined-event="this.$emit('event-user-joined-event')"
                        @event-user-left-event="this.$emit('event-user-left-event')"/>
        <EventComponent ref="eventComponentRef" :eventId="4"
                        @event-user-joined-event="this.$emit('event-user-joined-event')"
                        @event-user-left-event="this.$emit('event-user-left-event')"/>
        <EventComponent ref="eventComponentRef" :eventId="5"
                        @event-user-joined-event="this.$emit('event-user-joined-event')"
                        @event-user-left-event="this.$emit('event-user-left-event')"/>
        <EventComponent ref="eventComponentRef" :eventId="6"
                        @event-user-joined-event="this.$emit('event-user-joined-event')"
                        @event-user-left-event="this.$emit('event-user-left-event')"/>
        <EventComponent ref="eventComponentRef" :eventId="7"
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
  }
}
</script>
