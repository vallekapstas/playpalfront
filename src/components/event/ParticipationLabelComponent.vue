<template>
  <span :key="showLabel" class="position-absolute top-0 start-100 translate-middle badge text-bg-danger fs-6 shadow">Ootel</span>
</template>

<script>
export default {
  name: "ParticipationLabelComponent",

  computed: {
    showLabel() {
      return this.userLoggedIn
    },
  },

  data() {
    return {
      userLoggedIn: false,
      // todo: make this change the visibility
      userId: 0
    }
  },

  beforeMount() {
    this.handleComponentLoad();
  },

  methods: {
    handleComponentLoad() {
      this.getUserLoggedInAndId()
    },

    getUserLoggedInAndId() {
      if (sessionStorage.getItem('userId') !== null) {
        this.userLoggedIn = true
        this.userId = sessionStorage.getItem('userId')
      }
    }
  }

}
</script>