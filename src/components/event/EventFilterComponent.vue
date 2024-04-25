<template>

  <div class="container">


      <div class="row event-filter text-start bg-transparent border border-2 border-secondary rounded-2 py-3 px-4 m-4 shadow-sm">

        <div class="col-6">
          <div class="row">
            <div class="col-3 align-content-center text-secondary text-end fw-bold">Staatus</div>
            <div class="col-4">
              <select class="form-select border border-secondary-subtle">
                <option value="1">on</option>
                <option value="2">ei ole</option>
              </select>
            </div>
            <div class="col-5">
              <select class="form-select border border-secondary-subtle">
                <option value="1">aktiivne</option>
                <option value="2">ootel</option>
                <option value="2">tühistatud</option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-6">
          <div class="row">
            <div class="col align-middle">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="participant">
                <label class="form-check-label fw-bold text-secondary" for="participant">Olen osaleja</label>
              </div>
            </div>
            <div class="col">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="eventhost">
                <label class="form-check-label fw-bold text-secondary" for="eventhost">Olen korraldaja</label>
              </div>
            </div>
          </div>
        </div>

      </div>


  </div>

</template>

<script>
import EventImageComponent from "@/components/event/EventImageComponent.vue";

export default {
  name: "EventFilterComponent",
  components: {EventImageComponent},

  data() {
    return {
      selectedStatus: 'A',
      statuses: [
        {key: 'A', value: 'Aktiivne'},
        {key: 'P', value: 'Ootel'},
        {key: 'C', value: 'Tühistatud'},
      ],

      selectedStatusCondition: 'is',
      statusConditions: [
        {key: 'is', value: 'on'},
        {key: 'isnot', value: 'ei ole'}
      ]

    }
  }
}
</script>