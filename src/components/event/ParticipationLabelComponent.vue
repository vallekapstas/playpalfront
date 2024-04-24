<template>
  <span v-if="userLoggedIn" class="position-absolute top-0 start-100 translate-middle badge text-bg-danger fs-6 shadow">Ootel</span>
</template>

<script>
export default {
  name: "ParticipationLabelComponent",

  props: {
    userLoggedIn: false,
    userId: 0,
    userStatus: ''
  }


}
</script>