<template>
  <span class="position-absolute top-0 start-100 translate-middle badge text-bg-danger fs-6 shadow">Ootel</span>
</template>

<script>
export default {
  name: "ParticipationLabelComponent",

  props: {
    userId: 0,
    isHost: false,
    userStatus: ''
  },

}
</script>