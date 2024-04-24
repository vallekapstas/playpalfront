<template>


  <div class="container">

    <div @click="openEventPreviewModal(eventId)"
         class="event-wrapper text-start bg-light border border-2 border-primary rounded-2 py-3 px-4 m-4 shadow-sm">

      <div class="row mb-3">
        <div class="col col-10">
          <h2>{{ eventData.eventName }}</h2>
        </div>
        <div class="col col-2 text-end position-relative">
          <span class="position-absolute top-0 start-100 translate-middle badge text-bg-danger fs-6 shadow">Ootel</span>
        </div>
      </div>

      <div class="row fs-5">
        <div class="col-lg">

          <EventImageComponent :event-image="eventData.eventImage"/>

        </div>

        <div class="col-lg">
          <div class="p-1 mx-1 my-3 w-100"><i class="icon me-3 bi bi-clock-fill"></i>{{ eventDateAndTime }}
          </div>
          <div class="p-1 mx-1 my-3 w-100"><i class="icon me-3 bi bi-signpost-2-fill"></i>{{ this.eventData.cityName }},
            {{ this.eventData.countyName }}, {{ this.eventData.countryName }}
          </div>
          <div class="p-1 mx-1 my-3 w-100"><i class="icon me-3 bi bi-cake2-fill"></i>{{ minMaxAge }}</div>
          <div class="p-1 mx-1 my-3 w-100"><i class="icon me-3 bi bi-people-fill"></i><span
              class="text-primary">{{ participationCountDisplay }}</span> / {{ minMaxPlayers }}
          </div>
        </div>

        <div class="col-lg">
          <div class="p-1 mx-1 my-3 w-100"><i class="icon me-3 bi bi-house-fill"></i>{{ eventData.venueName }}</div>
          <div class="p-1 mx-1 my-3 w-100"><i class="icon me-3 bi bi-gem"></i>{{ eventData.skillName }}</div>
          <div class="p-1 mx-1 my-3 w-100"><i class="icon me-3 bi bi-person-bounding-box"></i>{{ hostName }}</div>
          <div class="p-1 mx-1 my-3 w-100"><i class="icon me-3 bi bi-currency-exchange"></i>{{ eventFee }}</div>
        </div>
      </div>

    </div>
  </div>


</template>

<script>
import router from "@/router";
import EventImageComponent from "@/components/event/EventImageComponent.vue";

export default {
  name: 'EventComponent',
  components: {EventImageComponent},

  props: {
    eventId: 0
  },

  computed: {
    eventDateAndTime() {
      return this.assembleDateAndTimeString()
    },

    minMaxPlayers() {
      return this.assembleMinMaxPlayersString()
    },

    participationCountDisplay() {
      return this.eventData.participantCount
    },

    minMaxAge() {
      return this.assembleMinMaxAgeString()
    },

    hostName() {
      return this.assembleHostNameString()
    },

    eventFee() {
      if (this.eventData.fee > 0) {
        return this.eventData.fee + ' €';
      } else {
        return 'Tasuta'
      }
    },

  },

  data() {
    return {
      eventData: {
        eventId: 0,
        hostId: 0,
        hostFirstName: '',
        hostLastName: '',
        eventName: '',
        venueName: '',
        startDate: '',
        endDate: '',
        startTime: {
          hour: 0,
          minute: 0,
          second: 0,
          nano: 0
        },
        endTime: {
          hour: 0,
          minute: 0,
          second: 0,
          nano: 0
        },
        minPlayers: 0,
        maxPlayers: 0,
        minAge: 0,
        maxAge: 0,
        fee: 0,
        skillId: 0,
        skillName: '',
        locationId: 0,
        cityName: '',
        countyName: '',
        countryName: '',
        eventImage: '',
        eventStatus: '',
        participantCount: 0
      }
    }
  },

  mounted() {
    this.handleComponentLoad()
  },

  methods: {

    handleComponentLoad() {
      this.getEventDataRequest()
    },

    getEventDataRequest() {
      this.$http.get(`/event/${this.eventId}`)
          .then(response => {
            this.eventData = response.data
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },

    // todo: get participants from event per current user id to check what the participation status is with this event

    openEventPreviewModal(id) {
      alert('test: open event preview modal ID: ' + id)
    },

    assembleDateAndTimeString() {
      let eventDateAndTimeResult = ''
      let startDate = this.formatDate(this.eventData.startDate)
      let startTime = this.formatTime(this.eventData.startTime)
      let endDate = this.formatDate(this.eventData.endDate)
      let endTime = this.formatTime(this.eventData.endTime)
      let toFrom = '-'

      if (startDate === endDate) {
        eventDateAndTimeResult =
            startDate + ' ' + startTime + toFrom + endTime;
      } else {
        eventDateAndTimeResult =
            startDate + ' ' + startTime + toFrom + endDate + ' ' + endTime;
      }

      return eventDateAndTimeResult
    },

    assembleMinMaxPlayersString() {
      let minMaxPlayersString = ''
      let minPlayers = this.eventData.minPlayers
      let maxPlayers = this.eventData.maxPlayers
      let notSet = 'Pole seatud'
      let maxPlayersText = 'Kuni'
      let minPlayersText = 'Vähemalt'
      let toFrom = '-'

      if (minPlayers === 0 && maxPlayers === 0) {
        minMaxPlayersString = notSet
      } else if (minPlayers === 0) {
        minMaxPlayersString = maxPlayersText + ' ' + maxPlayers
      } else if (maxPlayers === 0) {
        minMaxPlayersString = minPlayersText + ' ' + minPlayers
      } else {
        minMaxPlayersString = minPlayers + toFrom + maxPlayers
      }

      return minMaxPlayersString
    },

    assembleMinMaxAgeString() {
      let minMaxAgesString = ''
      let minAge = this.eventData.minAge
      let maxAge = this.eventData.maxAge
      let notSet = 'Kõik vanused'
      let maxAgeText = 'Kuni'
      let minAgeText = 'Vähemalt'
      let toFrom = '-'
      let ageUnit = 'a'

      if ((minAge === 0 || minAge === null) && (maxAge === 0 || maxAge === null)) {
        minMaxAgesString = notSet
      } else if (minAge === 0) {
        minMaxAgesString = maxAgeText + ' ' + maxAge + ' ' + ageUnit
      } else if (maxAge === 0) {
        minMaxAgesString = minAgeText + ' ' + minAge + ' ' + ageUnit
      } else {
        minMaxAgesString = minAge + toFrom + maxAge + ' ' + ageUnit
      }

      return minMaxAgesString
    },

    assembleHostNameString() {
      return this.eventData.hostFirstName + ' ' + this.eventData.hostLastName
    },

    formatDate(inputDate) {
      // Parse the input date string
      const parts = inputDate.split('-');
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];

      // Create a new Date object
      const date = new Date(year, month - 1, day);

      // Get the day, month, and year components from the Date object
      const formattedDay = String(date.getDate()).padStart(2, '0');
      const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
      const formattedYear = date.getFullYear();

      // Return the reformatted date string
      return `${formattedDay}.${formattedMonth}.${formattedYear}`;
    },

    formatTime(inputTime) {
      // Check if inputTime is a string
      if (typeof inputTime !== 'string') {
        // Return inputTime as is if it's not a string
        return inputTime;
      }

      // Split the input time string
      const parts = inputTime.split(':');
      const hour = parts[0];
      const minute = parts[1];

      // Return the reformatted time string
      return `${hour}:${minute}`;
    }

  },

}
</script>
