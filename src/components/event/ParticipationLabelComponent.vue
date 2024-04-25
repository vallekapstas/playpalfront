<template>
  <span :class="'position-absolute top-0 start-100 translate-middle badge fs-6 shadow ' + labelClass">{{
      labelText
    }}</span>
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
  },

  beforeMount() {
    this.assembleLabelText()
  },

  methods: {
    assembleLabelText() {
      return 'Ootel'
    },

    assembleLabelClass() {
      return 'badge-bg-danger'
    },
  }

}
</script>