<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Üritused</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-10">
        <EventFilterComponent @event-get-sorted-and-filtered-events="handleGetRequest"/>
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
import router from "@/router";

export default {
  name: 'HomeView',
  components: {
    EventFilterComponent,
    EventComponent
  },

  data() {
    return {
      events: [
        {
          eventId: 0
        }
      ]
    }
  },

  methods: {
    handleGetRequest(params) {
      const filteredParams = this.filterEmptyParams(params)
      this.sendGetEventsRequest(filteredParams)
      this.$emit('event-filter-and-sort-events')
    },

    sendGetEventsRequest(params = '') {
      this.$http.get('/events', {
            params: {
              status: params.status,
              stscond: params.stscond,
              sortdir: params.sortdir,
              sortparam: params.sortparam,
              participant: params.participant,
              host: params.host,
              userid: params.userid,
              minplayers: params.minplayers,
              maxplayers: params.maxplayers,
              minage: params.minage,
              maxage: params.maxage,
              minfee: params.minfee,
              maxfee: params.maxfee,
              minjoined: params.minjoined,
              maxjoined: params.maxjoined,
              countryid: params.countryid,
              countyid: params.countyid,
              cityid: params.cityid,
              skillid: params.skillid
            }
          }
      ).then(response => {
        this.events = response.data
      }).catch(() => {
        // router.push({name: 'errorRoute'})
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
    }

  },

  beforeMount() {
    this.sendGetEventsRequest()
  }
}
</script>
