<template>
  <div class="text-start bg-light border border-2 border-primary rounded-2 py-3 px-4 m-4 shadow-sm">
    <div class="row col-11 mx-auto needs-validation" novalidate>
      <div class="col-md-4" style="margin-top: 30px;">
        <label for="validationCustom01" class="form-label">Eesnimi*</label>
        <input type="text" class="form-control" id="validationCustom01" value="" required>
        <div class="valid-feedback">
          Sobib!
        </div>
      </div>

      <div class="col-md-4" style="margin-top: 30px;">
        <label for="validationCustom02" class="form-label">Perekonnanimi*</label>
        <input type="text" class="form-control" id="validationCustom02" value="" required>
        <div class="valid-feedback">
          Sobib!
        </div>
      </div>

      <div class="col-md-4" >
        <img class="img-fluid" src="../../assets/red_dice.png" alt="profile image"  style="height: 100px"/>
      </div>

      <div class="col-md-4" style="margin-top: 30px;">
        <label for="validationCustomUsername" class="form-label">Kasutajanimi*</label>
        <div class="input-group">
          <input type="text" class="form-control" id="validationCustomUsername" required v-model="userName"
                 @input="validateUserName">
          <span class="input-group-text" id="inputGroupPrepend">
      <span v-if="isCheckingUserName" class="status-text">Checking...</span>
      <span v-if="userName && !isCheckingUserName && !isUserNameAvailable" class="rejection-tick">❌</span>
      <span v-if="userName && !isCheckingUserName && isUserNameAvailable" class="approval-tick">✔️</span>
    </span>
        </div>
        <div class="error-message" style="height: 10px;">
          <div v-if="!isUserNameAvailable">{{ errorMessage }}</div>
        </div>
        <div class="invalid-feedback">
          Palun vali kasutajanimi.
        </div>
      </div>

      <div class="col-md-4" style="margin-top: 30px;">
        <label for="validationCustom01" class="form-label">Sünnikuupäev*</label>
        <input type="date" class="form-control">
        <div class="valid-feedback">
        </div>
      </div>

      <div class="col-md-4"></div>

      <div class="col-md-4" style="margin-top: 30px;">
        <label for="validationCustom01" class="form-label">Parool*</label>
        <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock">
        <div class="valid-feedback">
        </div>
      </div>

      <div class="col-md-4" style="margin-top: 30px;">
        <label for="validationCustom01" class="form-label">Parool uuesti*</label>
        <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock">
        <div class="valid-feedback">
        </div>
      </div>


      <div style="margin-top: 20px;">
        <label class="form-label">Elukoht*</label>
        <LocationDropdownsComponent/>
      </div>


      <div class="col-md-12 text-center" style="margin-top: 30px;">
        <label for="validationCustom01" class="form-label">Sugu*</label>

        <div class="row justify-content-center">
          <div class="col-md-4">
            <button class="btn"
                    :class="{ 'btn-outline-secondary': selectedGender !== 'female', 'btn-secondary': selectedGender === 'female' }"
                    type="button" style="width: 100%" @click="selectGender('female')">
              Naine
            </button>
          </div>
          <div class="col-md-4">
            <button class="btn"
                    :class="{ 'btn-outline-secondary': selectedGender !== 'male', 'btn-secondary': selectedGender === 'male' }"
                    type="button" style="width: 100%" @click="selectGender('male')">
              Mees
            </button>
          </div>
        </div>
      </div>

      <div class="form-floating" style="margin-top: 30px;">
        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
        <label for="floatingTextarea">Lemmikmängud</label>
      </div>

      <div class="form-floating" style="margin-top: 30px;">
        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
        <label for="floatingTextarea">Enesetutvustus</label>
      </div>


      <div class="col" style="margin-top: 80px; display: flex; justify-content: space-evenly;">
        <button class="btn btn-primary" type="submit" @click="goToEventView">tagasi</button>
        <button class="btn btn-primary" type="submit">Registreeri</button>
      </div>


    </div>
  </div>
</template>


<script>
import LocationDropdownsComponent from "@/components/input/LocationDropdownsComponent.vue";
import router from "@/router";

export default {
  name: "ProfileInputComponent",
  components: {LocationDropdownsComponent},
  data() {
    return {
      userName: '',
      isCheckingUserName: false,
      isUserNameAvailable: true,
      errorMessage: '',
      selectedGender: null
    }

  },
  methods: {

    async validateUserName() {
      const trimmedUserName = this.userName.trim(); // Remove leading and trailing spaces

      // Check if the username is not empty
      if (trimmedUserName) {
        this.isCheckingUserName = true;
        try {
          setTimeout(async () => {
            const response = await this.$http.get(`/user/${trimmedUserName}`);
            this.isUserNameAvailable = !response.data;
            this.errorMessage = this.isUserNameAvailable ? '' : 'Kasutajanimi on võetud';
            this.isCheckingUserName = false;
          }, 500);
        } catch (error) {
          console.error('Error checking userName availability:', error);
          this.errorMessage = 'Error checking userName availability';
          this.isCheckingUserName = false;
        }
      } else {
        // Handle empty username case here
        this.errorMessage = 'Username cannot be empty';
        this.isCheckingUserName = false; // Reset the loading state
      }
    },

    goToEventView() {
      router.push({name: 'indexRoute'})
    },
    selectGender(gender) {
      this.selectedGender = gender;
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

.input-group {
  position: relative; /* Ensure relative positioning for absolute positioning */
}

.status-text {
  position: absolute;
  left: 10px; /* Adjust left position as needed */
  top: 50%; /* Align vertically */
  transform: translateY(-50%);
}

.rejection-tick,
.approval-tick {
  margin-right: 10px; /* Adjust margin as needed */
}
</style>





