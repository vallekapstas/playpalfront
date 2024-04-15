<template>


  <div class="container">

    <div @click="openEventPreviewModal"
         class="event-wrapper text-start bg-light border border-2 border-primary rounded-2 py-3 px-4 m-4 shadow-sm">

      <div class="row mb-3">
        <div class="col col-10">
          <h2>Monopolyõhtu Raini juures</h2>
        </div>
        <div class="col col-2 text-end position-relative">
          <span class="position-absolute top-0 start-100 translate-middle badge text-bg-danger fs-6 shadow">Ootel</span>
        </div>
      </div>

      <div class="row fs-5">
        <div class="col-lg">
          <img class="img-fluid" src="../../assets/red_dice.png" alt="event-image"/>
        </div>

        <div class="col-lg">
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-calendar-week-fill"></i> 04.05.2024 16.00-22.00</div>
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-geo-alt-fill"></i> Tallinn, Harjumaa, Eesti</div>
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-people-fill"></i> 4-8</div>
        </div>
        <div class="col-lg">
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-building-fill"></i> Raini kodu</div>
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-star-fill"></i> Kõik on teretulnud</div>
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-currency-exchange"></i> Tasuta</div>
        </div>
      </div>

    </div>
  </div>


  <div class="container justify-content-center">
    <div @click="openEventPreviewModal"
        class="event-wrapper text-start bg-light border border-2 border-primary rounded-2 py-3 px-4 m-4 shadow-sm">

      <div class="row mb-3">
        <div class="col col-10">
          <h2>Wingspan @ Naiiv</h2>
        </div>
        <div class="col col-2 text-end position-relative">
          <span
              class="position-absolute top-0 start-100 translate-middle badge text-bg-success fs-6 shadow">Osalen</span>
        </div>
      </div>

      <div class="row fs-5">
        <div class="col-lg">
          <img class="img-fluid" src="../../assets/red_dice.png" alt="event-image"/>
        </div>

        <div class="col-lg">
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-calendar-week-fill"></i> 05.05.2024 18.00-21.30</div>
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-geo-alt-fill"></i> Tartu, Tartumaa, Eesti</div>
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-people-fill"></i> 3-5</div>
        </div>
        <div class="col-lg">
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-building-fill"></i> Naiiv</div>
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-star-fill"></i> Algajad</div>
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-currency-exchange"></i> 5 €</div>
        </div>
      </div>

    </div>
  </div>


  <div class="container justify-content-center">
    <div @click="openEventPreviewModal"
        class="event-wrapper text-start bg-light border border-2 border-primary rounded-2 py-3 px-4 m-4 shadow-sm">

      <div class="row mb-3">
        <div class="col col-10">
          <h2>D&D @ nipitiri</h2>
        </div>
        <div class="col col-2 text-end position-relative">
          <span
              class="position-absolute top-0 start-100 translate-middle badge text-bg-secondary fs-6 shadow">Suletud</span>
        </div>
      </div>

      <div class="row fs-5">
        <div class="col-lg">
          <img class="img-fluid" src="../../assets/red_dice.png" alt="event-image"/>
        </div>

        <div class="col-lg">
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-calendar-week-fill"></i> 08.05.2024 19.00-23.00</div>
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-geo-alt-fill"></i> Viljandi, Viljandimaa, Eesti</div>
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-people-fill"></i> 4-8</div>
        </div>
        <div class="col-lg">
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-building-fill"></i> Nipitiri</div>
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-star-fill"></i> Algajad</div>
          <div class="p-1 mx-1 my-4 w-100"><i class="bi bi-currency-exchange"></i> Tasuta</div>
        </div>
      </div>

    </div>
  </div>


</template>

<script>
export default {
  name: 'EventComponent',

  methods: {
    openEventPreviewModal() {
      alert('test: open event preview modal')
    }
  },

}
</script>
