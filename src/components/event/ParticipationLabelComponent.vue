<template>
  <div class="position-absolute top-0 start-100 translate-middle d-flex gap-1">
    <span v-if="showHostLabel" class="badge text-bg-warning shadow text-dark fs-6 shadow"><i class="bi bi-star-fill"></i></span>
    <span :class="'badge fs-6 shadow ' + labelClass">{{ labelText }}</span>
  </div >

</template>

<script>
export default {
  name: "ParticipationLabelComponent",

  props: {
    userId: 0,
    isHost: false,
    userStatus: ''
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