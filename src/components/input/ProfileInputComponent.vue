<template>
  <div
    class="row g-3 needs-validation" novalidate>
    <div class="col-md-4">
      <label for="validationCustom01" class="form-label">Eesnimi*</label>
      <input type="text" class="form-control" id="validationCustom01" value="" required>
      <div class="valid-feedback">
        Sobib!
      </div>
    </div>
    <div class="col-md-4">
      <label for="validationCustom02" class="form-label">Perekonnanimi*</label>
      <input type="text" class="form-control" id="validationCustom02" value="" required>
      <div class="valid-feedback">
        Sobib!
      </div>
    </div>
    <div class="col-md-4">
      <label for="validationCustomUsername" class="form-label">Kasutajanimi*</label>
      <div class="input-group">
        <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required v-model="userName" @input="validateUserName">
        <span class="input-group-text" id="inputGroupPrepend">
          <span v-if="isCheckingUserName">Checking...</span>
          <span v-if="userName && !isCheckingUserName && !isUserNameAvailable" class="rejection-tick">❌</span>
          <span v-if="userName && !isCheckingUserName && isUserNameAvailable" class="approval-tick">✔️</span>
        </span>
        <div v-if="!isUserNameAvailable">{{ errorMessage }}</div>
        <div class="invalid-feedback">
          Palun vali kasutajanimi.
        </div>
      </div>
    </div>
    <div>
      <LocationDropdownsComponent/>
    </div>
    <div class="col-md-4">
      <label for="validationCustom01" class="form-label">Parool*</label>
      <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock">
      <div class="valid-feedback">

      </div>
    </div>
    <div class="col-md-4">
      <label for="validationCustom01" class="form-label">Parool uuesti*</label>
      <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock">
      <div class="valid-feedback">
      </div>
    </div>
    <div>
      <div class="col-md-4">
        <label for="validationCustom01" class="form-label">Sugu*</label>

        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
          <label class="form-check-label" for="flexRadioDefault1">
            Naine
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
          <label class="form-check-label" for="flexRadioDefault2">
            Mees
          </label>
        </div>
        <div>
          <div >
            <input type="date" >
          </div>
        </div>
      </div>
    </div>

    <div class="col-12">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
        <label class="form-check-label" for="invalidCheck">
          Agree to terms and conditions
        </label>
        <div class="invalid-feedback">
          You must agree before submitting.
        </div>
      </div>
    </div>
    <div class="col-12">
      <button class="btn btn-primary" type="submit">Submit form</button>
    </div>
    </div>
</template>


<script>
import LocationDropdownsComponent from "@/components/input/LocationDropdownsComponent.vue";

export default {
  name: "ProfileInputComponent",
  components: {LocationDropdownsComponent},
  data() {
    return {
      userName: '',
      isCheckingUserName: false,
      isUserNameAvailable: true,
      errorMessage: ''
    }

  },
  methods: {

    async validateUserName() {
      this.isCheckingUserName = true;
      try {
        const response = await this.$http.get(`/user/${this.userName}`);
        this.isUserNameAvailable = !response.data;
        this.errorMessage = this.isUserNameAvailable ? '' : 'Username is already taken';
      } catch (error) {
        console.error('Error checking userName availability:', error);
        this.errorMessage = 'Error checking userName availability';
      } finally {
        this.isCheckingUserName = false;
      }
    }
  },

mounted() {
  // Add the script for disabling form submissions
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
}
};



</script>

<style>
.approval-tick {
  color: green;
}

.rejection-tick {
  color: red;
}
</style>





