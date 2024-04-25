<template>
  <div :key="reloadLabel" class="position-absolute top-0 start-100 translate-middle d-flex gap-1 pt-4" @click.stop>
    <span v-if="showHostLabel" class="badge host-icon shadow fs-5 shadow"><i class="bi bi-star-fill"></i></span>
    <div @mouseover="labelHover = true" @mouseleave="labelHover = false">
      <span v-if="labelHover" class="badge leave-event px-3 text-nowrap fw-bold fs-5" @click="deleteLeaveEventRequest">Lahku</span>
      <span v-else :class="'badge fs-5 shadow ' + labelClass">{{ labelText }}</span>
    </div>

    <span v-if="userId !== 0 && userStatus === ''" class="badge btn-primary px-3 text-nowrap fw-bold fs-5"
          @click="postJoinEventRequest">Liitu</span>
  </div>

</template>

<script>
import router from "@/router";

export default {
  name: "ParticipationLabelComponent",

  props: {
    eventId: 0,
    userId: 0,
    isHost: false,
    userStatus: '',
    participantId: 0
  },

  data() {
    return {
      reloadLabel: 0,
      labelHover: false
    }
  },

  computed: {
    labelText() {
      return this.assembleLabelText()
    },

    labelClass() {
      return this.assembleLabelClass()
    },

    showHostLabel() {
      return this.getHostLabelStatus()
    },

  },

  beforeMount() {
    this.assembleLabelText()
  },

  methods: {

    reloadLabelFunction() {
      this.reloadLabel++
    },

    postJoinEventRequest() {

      const parameters = {
        eventId: this.eventId,
        userId: this.userId
      }

      this.$http.post('/participant', parameters
      ).then(() => {
        this.$emit('event-user-joined-event')
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    deleteLeaveEventRequest() {
      this.$http.delete(`/participant/${this.participantId}`)
          .then(() => {
            this.$emit('event-user-left-event')
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },


    getHostLabelStatus() {
      return this.isHost
    },

    assembleLabelText() {
      if (this.userStatus === 'A') {
        return 'Osaled';
      }

      if (this.userStatus === 'P') {
        return 'Ootel';
      }

      if (this.userStatus === 'R') {
        return 'Keeldutud';
      }
    },

    assembleLabelClass() {
      if (this.userStatus === 'A') {
        return 'text-bg-success'
      }

      if (this.userStatus === 'P') {
        return 'text-bg-warning'
      }

      if (this.userStatus === 'R') {
        return 'text-bg-danger'
      }
    },
  }

}
</script>