<template>
<!--todo: kasutadta ProfileInputComponent-->

<!--todo: loo nupp mis kääivitab PUT /user/{userId} teenuse-->


</template>


<script>
export default {
  name: 'EditProfileView',
  userId: Number(sessionStorage.getItem('userId'))
  // todo: too ära kasutaja andmed GET /user/userI
  // todo: saad andmed kätte
  // todo: profileInputComponentRef abil väärtusta ärd userProfileInfo objekt


  // todo: loo meetod mis valideerib ära kõik väljad, (ProfileInputComponent-s vajalikud meetodid olemas)
  // todo: saada PUT sõnum et salvestada muudatused


}
</script>



