<template>
  <div class="container d-flex justify-content-center">
    <div class="event-wrapper text-start border border-2 border-dark rounded-2 py-2 px-4 w-50">

      <div class="row">
        <div class="col col-10">
          <h1>Monopolyõhtu Raini juures</h1>
        </div>
        <div class="col col-2 text-end">
          <span class="badge text-bg-warning">Ootel</span>
        </div>
      </div>

      <div class="row">
        <div class="col col-4 p-1 ps-3">
          <img class="border" src="" alt="event-image">
        </div>
        <div class="col col-4 p-1">
          <span class="btn btn-light">Aeg</span><br>
          <span class="btn btn-light">Asukoht</span><br>
          <span class="btn btn-light">Osalejate arv</span><br>
        </div>
        <div class="col col-4 p-1">
          <span class="btn btn-light">Asukoha nimi</span><br>
          <span class="btn btn-light">Tase</span><br>
          <span class="btn btn-light">Osalustasu</span><br>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'EventComponent',
}
</script>
