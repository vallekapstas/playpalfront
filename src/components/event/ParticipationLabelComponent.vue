<template>
  <span v-if="showLabel" class="position-absolute top-0 start-100 translate-middle badge text-bg-danger fs-6 shadow">Ootel</span>
</template>

<script>
export default {
  name: "ParticipationLabelComponent",

  props: {
    userLoggedIn: false,
    userId: 0,
    userStatus: ''
  },

  computed: {
    showLabel() {
      return this.show
      // todo: this does not trigger a reload!
    }
  },

  data() {
    return {
      show: false
    }
  }

}
</script>