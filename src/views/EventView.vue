<template>

  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Üritused</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-10">
        <EventFilterComponent @event-get-sorted-and-filtered-events="handleFilterAndSortRequest"/>
        <EventComponent :class="{ 'hidden': isLoading }" v-for="event in this.events" :key="event.eventId"
                        ref="eventComponentRef"
                        :event-id="event.eventId"
                        @event-user-joined-event="this.$emit('event-user-joined-event')"
                        @event-user-left-event="this.$emit('event-user-left-event')"/>

        <!-- Loading indicator -->
        <div v-show="isLoading" class="mt-5 loading-indicator">
          <div class="row mb-3">
            <div class="col">
              <div class="spinner-border text-primary" role="status"/>
            </div>
          </div>
        </div>

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
      isLoading: true,

      events: [
        {
          eventId: 0
        }
      ],

      params: {}
    }
  },

  methods: {
    async handleFilterAndSortRequest(rawParams) {
      this.params = this.filterEmptyParams(rawParams)
      await this.sendGetEventsRequest()
      setTimeout(this.setDoneLoading, 1000)
    },

    sendGetEventsRequest() {
      this.$http.get('/events', {
            params: this.params
          },
      ).then(response => {
        this.events = response.data
      }).catch(() => {
        // no error
      })
    },

    filterEmptyParams(params) {
      const filteredParams = {};

      for (const key in params) {
        if (params.hasOwnProperty(key) && params[key] !== '') {
          filteredParams[key] = params[key];
        }
      }

      return filteredParams;
    },

    setDoneLoading() {
      this.isLoading = false
    },

  },

  async beforeMount() {
    await this.sendGetEventsRequest()
    setTimeout(this.setDoneLoading, 1000)
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}

.loading-indicator {
  /* Add styles for loading indicator */
}
</style>
