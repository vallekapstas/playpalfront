<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5" aria-label="Tenth navbar example">
    <div class="container-fluid">
      <div class="text-light">PlayPal</div>

      <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="/">Üritused</a>
          </li>
        </ul>
      </div>

      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">Logi sisse</a>
        </li>
      </ul>
    </div>
  </nav>

  <router-view/>
</template>

<script setup>
</script>